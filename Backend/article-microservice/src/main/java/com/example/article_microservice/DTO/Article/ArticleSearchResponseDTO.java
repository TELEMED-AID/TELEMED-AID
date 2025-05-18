package com.example.article_microservice.DTO.Article;

import com.example.article_microservice.Model.Article;
import lombok.Data;

@Data
public class ArticleSearchResponseDTO {
    private Long id;
    private String title;
    private String category;
    private String contentSnippet; // Short preview
    private String doctorName;
    private String doctorCareerLevel;

    public ArticleSearchResponseDTO(Article article) {
        this.id = article.getId();
        this.title = article.getTitle();
        this.category = article.getCategory();
        this.contentSnippet = article.getContent().length() > 100
                ? article.getContent().substring(0, 100) + "..."
                : article.getContent();
        this.doctorName = article.getDoctor().getName();
        this.doctorCareerLevel = article.getDoctor().getCareerLevel();
    }
}

