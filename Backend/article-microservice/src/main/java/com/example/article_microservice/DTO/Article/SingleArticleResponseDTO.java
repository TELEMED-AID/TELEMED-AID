package com.example.article_microservice.DTO.Article;

import com.example.article_microservice.Model.Article;
import lombok.Data;

import java.time.Instant;

@Data
public class SingleArticleResponseDTO {
    private Long id;
    private String title;
    private String category;
    private String content; // Full preview
    private String doctorName;
    private String doctorCareerLevel;
    private String doctorSpecialization;
    private Instant articleTime;

    public SingleArticleResponseDTO(Article article) {
        this.id = article.getId();
        this.title = article.getTitle();
        this.category = article.getCategory();
        this.content = article.getContent();
        this.articleTime = article.getArticleTime();
        this.doctorName = article.getDoctor().getName();
        this.doctorCareerLevel = article.getDoctor().getCareerLevel();
        this.doctorSpecialization = article.getDoctor().getSpecializationName();
    }
}
