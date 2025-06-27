package telemid_aid.project.router.config;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import telemid_aid.project.router.dto.UserRequest;

@FeignClient(name = "patient-service", url = "http://localhost:8083")
public interface PatientServiceClient {

    @PostMapping("/api/patient/create-patient")
    ResponseEntity<String> createPatient(@RequestBody UserRequest request);
}