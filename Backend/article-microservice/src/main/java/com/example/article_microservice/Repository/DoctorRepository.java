package com.example.article_microservice.Repository;

import com.example.article_microservice.Model.Doctor;
import com.example.article_microservice.Model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository  extends
        JpaRepository<Doctor, Long> {
}
