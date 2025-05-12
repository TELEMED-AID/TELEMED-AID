package com.example.telemid_aid.enricher.dto;

import lombok.Data;

import java.sql.Date;

@Data
public class DoctorDto {
    private String name;
    private String phone;
    private Date birthDate;
    private String gender;
    private String countryName;
    private String countryId;
    private String careerLevel;
    private String specialization;
}
