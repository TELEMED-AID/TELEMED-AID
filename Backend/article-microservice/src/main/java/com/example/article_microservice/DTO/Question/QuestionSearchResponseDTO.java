package com.example.article_microservice.DTO.Question;

import com.example.article_microservice.Model.Article;
import com.example.article_microservice.Model.Question;
import jakarta.persistence.Column;
import lombok.Data;

import java.time.Instant;

@Data
public class QuestionSearchResponseDTO {
    private Long id;
    private String title;
    private String contentSnippet; // Short preview
    private String patientWrittenName;
    private Instant questionTime;

    public QuestionSearchResponseDTO(Question question) {
        this.id = question.getId();
        this.title = question.getTitle();
        this.patientWrittenName = question.getPatientWrittenName();
        this.contentSnippet = question.getContent().length() > 100
                ? question.getContent().substring(0, 100) + "..."
                : question.getContent();
        this.questionTime = question.getQuestionTime();
    }
}