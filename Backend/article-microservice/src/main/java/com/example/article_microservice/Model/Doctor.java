package com.example.article_microservice.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Doctor {
    @Id
    private Long id;
    private String name;
    @OneToMany(mappedBy = "doctor")  // "doctor" refers to the field in the Article entity
    private List<Article> articles;
    @OneToMany(mappedBy = "doctor")  // "doctor" refers to the field in the Article entity
    private List<Comment> questions;
    private String careerLevel;
    private String specializationName;
}
