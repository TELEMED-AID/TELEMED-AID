package com.example.article_microservice.Service.Interface;

import com.example.article_microservice.DTO.ArticleDTO;
import org.springframework.http.ResponseEntity;

public interface ArticleService {
    ResponseEntity<?> publishArticle(ArticleDTO articleDTO);
    ResponseEntity<?> searchArticle(String term);

}
