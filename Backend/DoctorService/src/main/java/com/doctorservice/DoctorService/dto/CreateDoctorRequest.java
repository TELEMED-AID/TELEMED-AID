package com.doctorservice.DoctorService.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.sql.Date;

@Data
public class CreateDoctorRequest {
    @NotBlank(message = "National ID is required")
    private String nationalId;

    @NotBlank(message = "Name is required")
    private String name;  // Changed from fullName to name

    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Invalid phone format")
    private String phone;  // Changed from phoneNumber to phone

    @NotNull(message = "Birth date is required")
    private Date birthDate;  // Added new field

    @NotBlank(message = "Gender is required")
    private String gender;  // Added new field

    @NotBlank(message = "Country name is required")
    private String countryName;  // Added new field

    @NotBlank(message = "Country ID is required")
    private String countryId;  // Added new field

    @NotBlank(message = "Career level name is required")
    private String careerLevelName;  // Changed from careerLevelId to careerLevelName

    @NotBlank(message = "Specialization name is required")
    private String specializationName;  // Changed from specializationId to specializationName
}