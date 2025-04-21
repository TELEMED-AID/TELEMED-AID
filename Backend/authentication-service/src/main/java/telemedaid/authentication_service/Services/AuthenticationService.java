package telemedaid.authentication_service.Services;


import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import telemedaid.authentication_service.Config.DoctorServiceClient;
import telemedaid.authentication_service.Config.PatientServiceClient;
import telemedaid.authentication_service.DTOs.*;
import telemedaid.authentication_service.Entities.User;
import telemedaid.authentication_service.Repositories.UserRepository;
import java.text.SimpleDateFormat;
import java.util.Date;
@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PatientServiceClient patientServiceClient; // Feign Client
    private final DoctorServiceClient doctorServiceClient;

    /**
     * GUA_UA_U1
     **/
    public AuthResponse registerPatient(RegisterPatientRequest request) {
        if (nationalIdExists(request.getNationalId())) {
            throw new RuntimeException("National ID already exists");
        }
        User user = User.builder()
                .nationalId(request.getNationalId())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .createdAt(new Date())
                .build();

        userRepository.save(user);
        String jwtToken = jwtService.generateToken(user);
        // 2. Send remaining data to Patient Service
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        CreatePatientRequest patientRequest = CreatePatientRequest.builder()
                .nationalId(request.getNationalId()).name(request.getName())
                .countryName(request.getCountryName())
                .countryId(request.getCountryId())
                .phone(request.getPhone()).gender(request.getGender())
                .birthDate(sdf.format(request.getDateOfBirth())).build();
        patientServiceClient.createPatient(patientRequest);
        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }
    public AuthResponse registerDoctor(RegisterDoctorRequest request) {
        if (nationalIdExists(request.getNationalId())) {
            throw new RuntimeException("National ID already exists");
        }
        User user = User.builder()
                .nationalId(request.getNationalId())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .createdAt(new Date())
                .build();
        userRepository.save(user);
        String jwtToken = jwtService.generateToken(user);

        CreateDoctorRequest createDoctorRequest = CreateDoctorRequest.builder()
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
        doctorServiceClient.addDoctor(createDoctorRequest);
        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }

    /**
     * GUA_UA_U3
     **/
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getNationalId(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByNationalId(request.getNationalId())
                .orElseThrow(() -> new RuntimeException("User not found with national ID: " + request.getNationalId()));

        String jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }

    private boolean nationalIdExists(String nationalId) {
        return userRepository.findByNationalId(nationalId).isPresent();
    }

    public UserDetails getUserByNationalId(String nationalId) {
        return userRepository.findByNationalId(nationalId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with national ID: " + nationalId));
    }

}