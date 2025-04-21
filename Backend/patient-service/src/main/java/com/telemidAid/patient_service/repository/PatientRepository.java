package com.telemidAid.patient_service.repository;

import com.telemidAid.patient_service.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, String> {
    @Override
    Optional<Patient> findById(String s);
}