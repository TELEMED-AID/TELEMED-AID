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
import java.util.List;

@RestController
@RequestMapping("/doctor")
@RequiredArgsConstructor
public class DoctorController {
    private final DoctorService doctorService;

    @PostMapping
    public ResponseEntity<?> createDoctor(
            @Valid @RequestBody CreateDoctorRequest request
    ) {
        DoctorResponse response = doctorService.createDoctor(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @PutMapping("/{nationalId}")
    public ResponseEntity<?> updateDoctor(
            @PathVariable Long userId,
            @Valid @RequestBody DoctorUpdateRequest request) {
        return ResponseEntity.ok(doctorService.updateDoctor(userId, request));
    }

    @GetMapping("/{nationalId}")
    public ResponseEntity<?> getDoctorById(@PathVariable Long userId) {
        return ResponseEntity.ok(doctorService.getDoctor(userId));
    }
    @PostMapping("/{nationalId}/availability")
    public ResponseEntity<?> setDoctorAvailability(
            @PathVariable Long userId,
            @Valid @RequestBody DoctorAvailabilityRequest request) throws Exception {

        doctorService.setDoctorAvailability(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
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

        DoctorSearchRequest request = DoctorSearchRequest.builder()
                .name(name)
                .specialization(specialization)
                .careerLevel(careerLevel)
                .availabilityDay(availabilityDay)
                .startTime(startTime)
                .build();

        PageResponse<DoctorSearchResponse> response = doctorService.searchDoctors(request, page, size);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/specialization")
    public List<SpecializationDto> getAllSpecializations() {
        return doctorService.getAllSpecializations();
    }
    @GetMapping("/career-level")
    public List<CareerLevelDto> getAllCareerLevels() {
        return doctorService.getAllCareerLevels();
    }

}