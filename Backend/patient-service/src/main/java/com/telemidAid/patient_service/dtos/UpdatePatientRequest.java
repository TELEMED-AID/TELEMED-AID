package com.telemidAid.patient_service.dtos;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UpdatePatientRequest {
    private String name;
    private String phone;
}
