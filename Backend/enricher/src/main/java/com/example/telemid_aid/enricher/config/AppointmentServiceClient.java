package com.example.telemid_aid.enricher.config;

import com.example.telemid_aid.enricher.dto.DoctorAppointmentDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "appointment-service", url = "${appointment.service.url}")
public interface AppointmentServiceClient {
    @PostMapping("/api/appointments/doctors")
    void sendDoctorData(@RequestBody DoctorAppointmentDTO doctorDto);
}
