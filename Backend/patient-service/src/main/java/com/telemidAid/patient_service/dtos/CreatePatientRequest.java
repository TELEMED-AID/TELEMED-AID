package com.telemidAid.patient_service.dtos;

import com.telemidAid.patient_service.model.Patient;
import lombok.*;

import java.sql.Date;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreatePatientRequest {
    private Long id;
    private String nationalId;  // Must match exactly
    private String name;
    private String countryName;
    private String countryId;
    private String phone;
    private Date birthDate;
    private String gender;


    public static CreatePatientRequest createPatientToDto(Patient patient){
        return CreatePatientRequest.builder()
                .id(patient.getId())
                .nationalId(patient.getNationalId())
                .name(patient.getName())
                .countryName(patient.getCountryName())
                .countryId(patient.getCountryId())
                .phone(patient.getPhone())
                .birthDate(patient.getBirthDate())
                .gender(patient.getGender())
                .build();
    }
}