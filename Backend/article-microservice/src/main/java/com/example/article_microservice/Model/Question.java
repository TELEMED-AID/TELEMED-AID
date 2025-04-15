package com.example.article_microservice.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Entity
@NoArgsConstructor
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String patientWrittenName;
    private String content;
    private Instant questionTime;
    private String title;
    public Question(String patientWrittenName, String title, String content, Instant questionTime) {
        this.patientWrittenName = patientWrittenName;
        this.title = title;
        this.content = content;
        this.questionTime = questionTime;
    }
}
