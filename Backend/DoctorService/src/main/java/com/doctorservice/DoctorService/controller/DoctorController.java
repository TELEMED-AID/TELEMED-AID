package com.doctorservice.DoctorService.controller;

import com.doctorservice.DoctorService.dto.*;
import com.doctorservice.DoctorService.service.DoctorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.time.LocalTime;

@RestController
@RequestMapping("/api/doctor")
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
    @PostMapping("/{nationalId}/availability")
    public ResponseEntity<?> setDoctorAvailability(
            @PathVariable String nationalId,
            @Valid @RequestBody DoctorAvailabilityRequest request) throws Exception {

        doctorService.setDoctorAvailability(nationalId, request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<PageResponse<DoctorSearchResponse>> searchDoctors(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String specialization,
            @RequestParam(required = false) String careerLevel,
            @RequestParam(required = false) DayOfWeek availabilityDay,
            @RequestParam(required = false) @DateTimeFormat(pattern = "HH:mm") LocalTime startTime,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        DoctorSearchRequest request = new DoctorSearchRequest();
        request.setName(name);
        request.setSpecialization(specialization);
        request.setCareerLevel(careerLevel);
        request.setAvailabilityDay(availabilityDay);
        request.setStartTime(startTime);

        PageResponse<DoctorSearchResponse> response = doctorService.searchDoctors(request, page, size);
        return ResponseEntity.ok(response);
    }

}