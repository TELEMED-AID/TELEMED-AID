package telemedaid.authentication_service.Config;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import telemedaid.authentication_service.DTOs.CreateDoctorRequest;
@FeignClient(name = "doctor-service", url = "http://localhost:8080")
public interface DoctorServiceClient {
    @PostMapping("/api/doctors")
    ResponseEntity<String> addDoctor(@RequestBody CreateDoctorRequest request);
}
