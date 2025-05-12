package com.example.telemid_aid.enricher.config;

import com.example.telemid_aid.enricher.dto.DoctorDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "doctor-service", url = "${doctor.service.url}")
public interface DoctorServiceClient {

    @GetMapping("/api/doctor/{id}")
    DoctorDto getDoctorById(@PathVariable Long id);
}
