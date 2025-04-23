package telemedaid.authentication_service.Controllers;


import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import telemedaid.authentication_service.DTOs.AuthResponse;
import telemedaid.authentication_service.DTOs.LoginRequest;
import telemedaid.authentication_service.DTOs.RegisterDoctorRequest;
import telemedaid.authentication_service.DTOs.RegisterPatientRequest;
import telemedaid.authentication_service.Exceptions.AuthenticationFailedException;
import telemedaid.authentication_service.Exceptions.UserAlreadyExistsException;
import telemedaid.authentication_service.Exceptions.UserNotFoundException;
import telemedaid.authentication_service.Services.AuthenticationService;
import telemedaid.authentication_service.Services.JwtService;
import telemedaid.authentication_service.DTOs.ErrorResponse;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;
    private final JwtService jwtService;
    /**
     * GUA_UA_U1
     **/
    @PostMapping("/signup/patient")
    public ResponseEntity<?> registerPatient(@RequestBody RegisterPatientRequest request) {
        try {
            return ResponseEntity.ok(authenticationService.registerPatient(request));
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse("Registration failed", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Registration failed", "An unexpected error occurred"));
        }
    }
    @PostMapping("/signup/doctor")
    public ResponseEntity<?> registerDoctor(@RequestBody RegisterDoctorRequest request) {
        try {
            return ResponseEntity.ok(authenticationService.registerDoctor(request));
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse("Registration failed", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Registration failed", "An unexpected error occurred"));
        }
    }

    /**
     * GUA_UA_U3
     **/
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        try {
            AuthResponse authResponse = authenticationService.login(request);

            Cookie jwtCookie = new Cookie("jwt", authResponse.getToken());
            jwtCookie.setHttpOnly(true);
            jwtCookie.setSecure(false); // Set to true in production with HTTPS
            jwtCookie.setPath("/");
            jwtCookie.setMaxAge(24 * 60 * 60); // 1 day
            response.addCookie(jwtCookie);

            return ResponseEntity.ok(AuthResponse.builder().token("JWT set in cookie").build());

        } catch (AuthenticationFailedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Authentication failed", e.getMessage()));
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Authentication failed", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Authentication failed", "An unexpected error occurred"));
        }
    }
}