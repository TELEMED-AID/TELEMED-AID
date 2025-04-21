package com.doctorservice.DoctorService.controller;

import com.doctorservice.DoctorService.dto.CreateDoctorRequest;
import com.doctorservice.DoctorService.dto.DoctorResponse;
import com.doctorservice.DoctorService.dto.DoctorUpdateRequest;
import com.doctorservice.DoctorService.service.DoctorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
public class DoctorController {
    private final DoctorService doctorService;

    @PostMapping
    public ResponseEntity<DoctorResponse> addDoctor(
            @Valid @RequestBody CreateDoctorRequest request
    ) {
        DoctorResponse response = doctorService.addDoctor(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @PutMapping("/{nationalId}")
    public ResponseEntity<DoctorResponse> updateDoctorProfile(
            @PathVariable String nationalId,
            @Valid @RequestBody DoctorUpdateRequest request) {
        return ResponseEntity.ok(doctorService.updateDoctorProfile(nationalId, request));
    }

    @GetMapping("/{nationalId}")
    public ResponseEntity<DoctorResponse> getDoctorById(@PathVariable String nationalId) {
        return ResponseEntity.ok(doctorService.getDoctorById(nationalId));
    }
}