package com.doctorservice.DoctorService.repository;

import com.doctorservice.DoctorService.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, String> {
}
