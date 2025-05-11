package com.telemidAid.patient_service.serviceTest;

import com.telemidAid.patient_service.dtos.CreatePatientRequest;
import com.telemidAid.patient_service.dtos.GetPatientRequest;
import com.telemidAid.patient_service.dtos.UpdatePatientRequest;
import com.telemidAid.patient_service.model.Patient;
import com.telemidAid.patient_service.repository.PatientRepository;
import com.telemidAid.patient_service.service.PatientService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.beans.factory.annotation.Autowired;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Optional;

public class PatientServiceTest {

    @Mock
    private PatientRepository patientRepository;

    @InjectMocks
    private PatientService patientService;

    private CreatePatientRequest createPatientRequest;
    private UpdatePatientRequest updatePatientRequest;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);

        createPatientRequest = new CreatePatientRequest();
        createPatientRequest.setId(1L);
        createPatientRequest.setNationalId("12345");
        createPatientRequest.setCountryName("USA");
        createPatientRequest.setCountryId("UA");
        createPatientRequest.setName("John Doe");
        createPatientRequest.setGender("Male");
        createPatientRequest.setPhone("123456789");
        createPatientRequest.setBirthDate(Date.valueOf("1990-05-15"));

        updatePatientRequest = new UpdatePatientRequest();
        updatePatientRequest.setName("John Updated");
        updatePatientRequest.setPhone("987654321");
    }

    @Test
    public void getPatientTest() {
        // Arrange
        Patient existingPatient = new Patient(1L,"12345", "John Doe", "USA", "US", "123456789",Date.valueOf("1990-05-15"), "Male");

        when(patientRepository.findById(1L))
                .thenReturn(Optional.of(existingPatient));

        // Act
        GetPatientRequest result = patientService.getPatient(1L);

        // Assert
        assertNotNull(result);
        assertEquals("John Doe", result.getName());
        assertEquals("123456789", result.getPhone());
        assertEquals("USA", result.getCountryName());

        verify(patientRepository, times(1)).findById(1L);
        verifyNoMoreInteractions(patientRepository);
    }
    @Test
    public void testCreatePatient() {
        patientService.createPatient(createPatientRequest);

        // Verify interaction with the repository
        verify(patientRepository, times(1)).save(any(Patient.class));
    }

    @Test
    public void testUpdatePatientInfo_PatientExists() {
        Patient existingPatient = new Patient(1L,"12345", "John Doe", "USA", "US", "123456789",Date.valueOf("1990-05-15"), "Male");
        when(patientRepository.findById(1L)).thenReturn(Optional.of(existingPatient));

        boolean updated = patientService.updatePatientInfo(1L, updatePatientRequest);

        assertTrue(updated);
        verify(patientRepository, times(1)).save(any(Patient.class));
    }

    @Test
    public void testUpdatePatientInfo_PatientNotFound() {
        when(patientRepository.findById(1L)).thenReturn(Optional.empty());

        boolean updated = patientService.updatePatientInfo(1L, updatePatientRequest);

        assertFalse(updated);
    }
}