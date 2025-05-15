package com.telemidAid.patient_service.serviceTest;

import com.telemidAid.patient_service.dtos.CreatePatientRequest;
import com.telemidAid.patient_service.dtos.GetPatientRequest;
import com.telemidAid.patient_service.dtos.UpdatePatientRequest;
import com.telemidAid.patient_service.model.Patient;
import com.telemidAid.patient_service.repository.PatientRepository;
import com.telemidAid.patient_service.service.PatientService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import java.sql.Date;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class PatientServiceTest {

    @Mock
    private PatientRepository patientRepository;

    @InjectMocks
    private PatientService patientService;

    @Test
    public void patientService_getPatient_returnPatient() {
        // Arrange
        Patient existingPatient = Patient.builder()
                .id(1L)
                .nationalId("30105210201271")
                .name("Mohamed")
                .countryName("Egypt")
                .countryId("EGP")
                .phone("01201841997")
                .birthDate( Date.valueOf("2001-05-21"))
                .gender("Male")
                .build();

        when(patientRepository.findById(1L))
                .thenReturn(Optional.of(existingPatient));

        // Act
        GetPatientRequest result = patientService.getPatient(1L);

        // Assert
        assertNotNull(result);
        assertEquals("Mohamed", result.getName());

        verify(patientRepository, times(1)).findById(1L);
        verifyNoMoreInteractions(patientRepository);
    }
    @Test
    public void patientService_createPatient_returnPatient() {
        CreatePatientRequest newPatient = CreatePatientRequest.builder()
                .id(1L)
                .nationalId("30105210201271")
                .name("Mohamed")
                .countryName("Egypt")
                .countryId("EGP")
                .phone("01201841997")
                .birthDate( Date.valueOf("2001-05-21"))
                .gender("Male")
                .build();

        patientService.createPatient(newPatient);

        // Verify interaction with the repository
        verify(patientRepository, times(1)).save(any(Patient.class));
    }

    @Test
    public void patientService_updatePatient_returnBoolean() {
        Patient existingPatient = Patient.builder()
                .id(1L)
                .nationalId("30105210201271")
                .name("Mohamed")
                .countryName("Egypt")
                .countryId("EGP")
                .phone("01201841997")
                .birthDate( Date.valueOf("2001-05-21"))
                .gender("Male")
                .build();

        UpdatePatientRequest patientInfo = UpdatePatientRequest.builder()
                .name("Ziad")
                .phone("01201841997")
                .build();
        when(patientRepository.findById(1L)).thenReturn(Optional.of(existingPatient));
        boolean updated = patientService.updatePatient(1L, patientInfo);

        assertTrue(updated);
        verify(patientRepository, times(1)).save(any(Patient.class));
    }

    @Test
    public void patientService_getPatient_patientNotFound_throwsException() {
        when(patientRepository.findById(1L)).thenReturn(Optional.empty());

        ResponseStatusException thrown = assertThrows(ResponseStatusException.class, () ->
                patientService.getPatient(1L));

        assertEquals("404 NOT_FOUND \"Patient with id 1 not found\"", thrown.getMessage());
    }
    @Test
    public void patientService_updatePatient_patientNotFound_returnsFalse() {
        when(patientRepository.findById(1L)).thenReturn(Optional.empty());

        boolean result = patientService.updatePatient(1L, new UpdatePatientRequest());
        assertFalse(result);
    }
}