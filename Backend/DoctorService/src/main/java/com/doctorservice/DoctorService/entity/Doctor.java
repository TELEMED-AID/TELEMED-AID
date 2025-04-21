package com.doctorservice.DoctorService.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Entity
@Table(name = "doctor")
@Data
public class Doctor {
    @Id
    @Column(name = "national_id", length = 20)
    private String nationalId;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "phone", nullable = false, length = 20)
    private String phone;  // Changed from phoneNumber to phone

    @Column(name = "birth_date", nullable = false)
    private Date birthDate;

    @Column(name = "gender", nullable = false, length = 10)
    private String gender;

    @Column(name = "country_name", nullable = false, length = 30)
    private String countryName;

    @Column(name = "country_id", nullable = false, length = 20)
    private String countryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "career_id", nullable = false)
    private CareerLevel careerLevel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "specialization_id", nullable = false)
    private Specialization specialization;
}