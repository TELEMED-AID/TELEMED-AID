package com.telemidAid.patient_service.controllerTest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.telemidAid.patient_service.dtos.CreatePatientRequest;
import com.telemidAid.patient_service.dtos.UpdatePatientRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.sql.Date;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class PatientControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private CreatePatientRequest createPatientRequest;
    private UpdatePatientRequest updatePatientRequest;
    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setup() throws JsonProcessingException {
        createPatientRequest = new CreatePatientRequest();
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
    public void testCreatePatient() throws Exception {
        String createPatient = objectMapper.writeValueAsString(createPatientRequest);
        mockMvc.perform(MockMvcRequestBuilders.post("/patients")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createPatient))
                .andExpect(status().isOk())
                .andExpect(content().string("Patient profile created."));
    }

    @Test
    public void testUpdatePatientInfo() throws Exception {
        String updatePatient = objectMapper.writeValueAsString(updatePatientRequest);
        mockMvc.perform(MockMvcRequestBuilders.put("/patients/12345")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatePatient))
                .andExpect(status().isOk())
                .andExpect(content().string("Patient information updated successfully."));
    }

    @Test
    public void testUpdatePatientInfo_PatientNotFound() throws Exception {
        String updatePatient = objectMapper.writeValueAsString(updatePatientRequest);
        mockMvc.perform(MockMvcRequestBuilders.put("/patients/99999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatePatient))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Patient not found for userId: 99999"));
    }
}
