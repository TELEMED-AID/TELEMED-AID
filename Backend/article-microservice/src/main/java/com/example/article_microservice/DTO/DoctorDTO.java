package com.example.article_microservice.DTO;

import lombok.Data;

@Data
public class DoctorDTO {
    private long id;
    private String name;
    private String careerLevel;
    private String specializationName;
}
