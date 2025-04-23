package com.example.article_microservice.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @JsonManagedReference
    @OneToMany(mappedBy = "doctor")  // "doctor" refers to the field in the Article entity
    private List<Article> articles;
    @OneToMany(mappedBy = "doctor")  // "doctor" refers to the field in the Comment entity
    @JsonBackReference
    private List<Comment> comments;
    private String careerLevel;
    private String specializationName;
}
