package com.telemidAid.patient_service.service;

import com.telemidAid.patient_service.dtos.CreatePatientRequest;
import com.telemidAid.patient_service.dtos.GetPatientRequest;
import com.telemidAid.patient_service.dtos.UpdatePatientRequest;
import com.telemidAid.patient_service.model.Patient;
import com.telemidAid.patient_service.repository.PatientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public void createPatient(CreatePatientRequest request) {
        Patient patient = Patient.builder()
                .nationalId(request.getNationalId())
                .countryName(request.getCountryName())
                .countryId(request.getCountryId())
                .name(request.getName())
                .gender(request.getGender())
                .phone(request.getPhone())
                .birthDate(request.getBirthDate())
                .build();

        patientRepository.save(patient);
    }
    @Transactional(readOnly = true)
    public GetPatientRequest getPatient(String patientId) {
        return patientRepository.findById(patientId)
                .map(GetPatientRequest::fromEntity)
                .orElseThrow(() -> new ResponseStatusException(
                        NOT_FOUND,
                        "Patient with id " + patientId + " not found"
                ));
    }

    public boolean updatePatientInfo(String userId, UpdatePatientRequest request) {
        Optional<Patient> optionalPatient = patientRepository.findById(userId);
        if (optionalPatient.isEmpty()) {
            return false;
        }
        Patient patient = optionalPatient.get();
        patient.setName(request.getName());
        patient.setPhone(request.getPhone());

        patientRepository.save(patient);
        return true;
    }
}
