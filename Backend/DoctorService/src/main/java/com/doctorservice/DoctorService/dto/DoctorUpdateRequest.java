package com.doctorservice.DoctorService.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class DoctorUpdateRequest {
    @NotBlank(message = "Name is required")
    private String name;  // Changed from fullName to name

    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Invalid phone format")
    private String phone;  // Changed from phoneNumber to phone
}