package com.example.telemid_aid.enricher.service;

import com.example.telemid_aid.enricher.config.DoctorServiceClient;
import com.example.telemid_aid.enricher.dto.DoctorDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorServiceClient doctorServiceClient;
    public DoctorDto fetchDoctorById(Long doctorId) {
        System.out.println("Fetching doctor data from Doctor Service...");
        try {
            DoctorDto doctor = doctorServiceClient.getDoctorById(doctorId);
            System.out.println("Received doctor data: " + doctor);
            return doctor;
        } catch (Exception e) {
            System.err.println("Error fetching doctor data: " + e.getMessage());
            throw new RuntimeException("Failed to fetch doctor data", e);
        }
    }
}