package telemedaid.authentication_service.Services;


import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import telemedaid.authentication_service.Config.PatientServiceClient;
import telemedaid.authentication_service.DTOs.AuthResponse;
import telemedaid.authentication_service.DTOs.CreatePatientRequest;
import telemedaid.authentication_service.DTOs.LoginRequest;
import telemedaid.authentication_service.DTOs.RegisterRequest;
import telemedaid.authentication_service.Entities.User;
import telemedaid.authentication_service.Repositories.UserRepository;
import java.util.Date;
@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PatientServiceClient patientServiceClient; // Feign Client

    /**
     * GUA_UA_U1
     **/
    public AuthResponse register(RegisterRequest request) {
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
        CreatePatientRequest patientRequest = new CreatePatientRequest();
        patientRequest.setNationalId(request.getNationalId());
        patientRequest.setName(request.getName());
        patientRequest.setCountryName(request.getCountryName());
        patientRequest.setCountryId(request.getCountryId());
        patientRequest.setPhone(request.getPhone());
        patientRequest.setGender(request.getGender());
        patientRequest.setBirthDate("2001-02-15");

        patientServiceClient.createPatient(patientRequest);
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