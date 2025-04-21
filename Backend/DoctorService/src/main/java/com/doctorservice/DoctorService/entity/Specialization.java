package com.doctorservice.DoctorService.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "specialization")
@Data
public class Specialization {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "specialization_name", nullable = false, length = 30)
    private String specializationName;
}