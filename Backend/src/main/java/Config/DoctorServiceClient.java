package Config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestBody;

//@FeignClient(name = "doctor-service", url = "http://localhost:9090")
public interface DoctorServiceClient {
//    @GetMapping("/doctor/availability")
//    ResponseEntity<String> getDoctors(@RequestBody CreatePatientRequest request);
}
