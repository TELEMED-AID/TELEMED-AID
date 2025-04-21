package com.telemidAid.patient_service.dtos;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;


@Getter
@Setter
public class CreatePatientRequest {
    private String nationalId;  // Must match exactly
    private String name;
    private String countryName;
    private String countryId;
    private String gender;
    private String phone;
    private Date birthDate;
}