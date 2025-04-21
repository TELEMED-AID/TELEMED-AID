package com.doctorservice.DoctorService.dto;

import lombok.Data;

import java.sql.Date;

@Data
public class DoctorResponse {
    private String name;
    private String phone;
    private Date birthDate;
    private String gender;
    private String countryName;
    private String countryId;
    private String careerLevel;
    private String specialization;
}