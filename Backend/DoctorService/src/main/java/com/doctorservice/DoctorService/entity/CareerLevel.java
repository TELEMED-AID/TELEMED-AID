package com.doctorservice.DoctorService.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Table(name = "career_level")
@Data
@AllArgsConstructor
public class CareerLevel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "career_level_name", nullable = false, length = 30)
    private String careerLevelName;
}