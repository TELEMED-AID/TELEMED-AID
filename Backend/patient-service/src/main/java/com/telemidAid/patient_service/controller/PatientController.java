package com.telemidAid.patient_service.controller;

import com.telemidAid.patient_service.dtos.CreatePatientRequest;
import com.telemidAid.patient_service.dtos.GetPatientRequest;
import com.telemidAid.patient_service.dtos.UpdatePatientRequest;
import com.telemidAid.patient_service.service.PatientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/patients")
public class PatientController {
    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping("/{patientId}")
    public ResponseEntity<?> getPatient(@PathVariable Long patientId) {
        try {
            GetPatientRequest patient = patientService.getPatient(patientId);
            return ResponseEntity.ok(patient);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Patient not found with ID: " + patientId);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> createPatient(@RequestBody CreatePatientRequest request) {
        try {
            patientService.createPatient(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Patient profile created successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid request: " + e.getMessage());
        }
    }

    @PutMapping("/{patientId}")
    public ResponseEntity<?> updatePatientInfo(
            @PathVariable String patientId,
            @RequestBody UpdatePatientRequest request) {
        try {
            boolean updated = patientService.updatePatientInfo(patientId, request);
            if (updated) {
                return ResponseEntity.ok("Patient information updated successfully.");
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Patient not found with ID: " + patientId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid request: " + e.getMessage());
        }
    }
}
