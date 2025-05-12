package telemedaid.authentication_service.Services;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import telemedaid.authentication_service.Config.DoctorServiceClient;
import telemedaid.authentication_service.Config.PatientServiceClient;
import telemedaid.authentication_service.Config.VerificationServiceClient;
import telemedaid.authentication_service.DTOs.*;
import telemedaid.authentication_service.Entities.User;
import telemedaid.authentication_service.Exceptions.AuthenticationFailedException;
import telemedaid.authentication_service.Exceptions.UserAlreadyExistsException;
import telemedaid.authentication_service.Exceptions.UserNotFoundException;
import telemedaid.authentication_service.Repositories.UserRepository;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PatientServiceClient patientServiceClient; // Feign Client
    private final DoctorServiceClient doctorServiceClient;
    private final VerificationServiceClient verificationServiceClient;

    /**
     * GUA_UA_U1
     **/
    public AuthResponse registerPatient(RegisterPatientRequest request) {
        if (nationalIdExists(request.getNationalId())) {
            throw new UserAlreadyExistsException("National ID already exists");
        }

        try {
            User user = User.builder()
                    .nationalId(request.getNationalId())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(request.getRole())
                    .createdAt(new Date())
                    .build();

            validateInquiryStatus(request.getInquiryId());
            userRepository.save(user);
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
            CreatePatientRequest patientRequest = CreatePatientRequest.builder()
                    .id(user.getId())
                    .nationalId(request.getNationalId())
                    .name(request.getName())
                    .countryName(request.getCountryName())
                    .countryId(request.getCountryId())
                    .phone(request.getPhone())
                    .gender(request.getGender())
                    .birthDate(sdf.format(request.getDateOfBirth()))
                    .build();

            /*patientServiceClient.createPatient(patientRequest);*/ /* Feign client to patient-service*/

            return AuthResponse.builder()
                    .token("Registered Successfully")
                    .build();

        } catch (Exception e) {
            throw new RuntimeException("Failed to register patient: " + e.getMessage());
        }
    }

    public AuthResponse registerDoctor(RegisterDoctorRequest request) {
        if (nationalIdExists(request.getNationalId())) {
            throw new UserAlreadyExistsException("National ID already exists");
        }

        try {
            User user = User.builder()
                    .nationalId(request.getNationalId())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(request.getRole())
                    .createdAt(new Date())
                    .build();

            validateInquiryStatus(request.getInquiryId());

            userRepository.save(user);
            CreateDoctorRequest createDoctorRequest = CreateDoctorRequest.builder()
                    .id(user.getId())
                    .name(request.getName())
                    .nationalId(request.getNationalId())
                    .birthDate(request.getDateOfBirth())
                    .careerLevelName(request.getCareerLevelName())
                    .countryId(request.getCountryId())
                    .countryName(request.getCountryName())
                    .gender(request.getGender())
                    .phone(request.getPhone())
                    .specializationName(request.getSpecializationName())
                    .build();

            /*doctorServiceClient.addDoctor(createDoctorRequest);*/ /* Feign client to doctor-service*/

            return AuthResponse.builder()
                    .token("Registered Successfully")
                    .build();

        } catch (Exception e) {
            throw new RuntimeException("Failed to register doctor: " + e.getMessage());
        }
    }
    /**
     * GUA_UA_U2
     **/
    public InquiryResponse verifyNationalId() {
        ResponseEntity<?> response = verificationServiceClient.createOcrInquiry();
        System.out.println(response.getStatusCode());
        System.out.println(response.getBody());

        if (response.getStatusCode().is2xxSuccessful()) {
            Map<String, String> responseBody = (Map<String, String>) response.getBody();

            assert responseBody != null;
            return InquiryResponse.builder()
                    .inquiryId(responseBody.get("inquiryId"))
                    .verificationLink(responseBody.get("verificationLink"))
                    .build();
        } else {
            throw new RuntimeException("Failed to initiate national ID verification");
        }
    }



    /**
     * GUA_UA_U3
     **/
    public AuthResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getNationalId(),
                            request.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new AuthenticationFailedException("Invalid national ID or password");
        }

        User user = userRepository.findByNationalId(request.getNationalId())
                .orElseThrow(() -> new UserNotFoundException("User not found with national ID: " + request.getNationalId()));

        String jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }

    private boolean nationalIdExists(String nationalId) {
        return userRepository.findByNationalId(nationalId).isPresent();
    }

    public UserDTO getUserByNationalId(String nationalId) {
        User user = userRepository.findByNationalId(nationalId)
                .orElseThrow(() ->
                        new UserNotFoundException
                                ("User not found with national ID: "
                                        + nationalId));
        return UserDTO.builder()
                .id(user.getId())
                .role(user.getRole())
                .build();
    }
    public String extractUsername(String token) {
        return jwtService.extractUsername(token); // from your JWT utility/service
    }

    public void validateInquiryStatus(String inquiryId) {
        String status = verificationServiceClient.inquiryState(inquiryId);
        System.out.println("Status is :" + status);
        if (status == null) {
            throw new RuntimeException("Failed to verify inquiry status");
        }
        if (!"approved".equalsIgnoreCase(status)) {
            throw new RuntimeException("Identity verification failed. Status: " + status);
        }
    }

}