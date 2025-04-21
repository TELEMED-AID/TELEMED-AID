package com.telemidAid.patient_service.dtos;

import com.telemidAid.patient_service.model.Patient;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;


@Getter
@Setter
@AllArgsConstructor
public class GetPatientRequest {
    private String name;
    private String countryName;
    private String countryId;
    private String gender;
    private String phone;
    private Date birthDate;

    public static GetPatientRequest fromEntity(Patient patient) {
        return new GetPatientRequest(
                patient.getName(),
                patient.getCountryName(),
                patient.getCountryId(),
                patient.getGender(),
                patient.getPhone(),
                patient.getBirthDate()
        );
    }
}