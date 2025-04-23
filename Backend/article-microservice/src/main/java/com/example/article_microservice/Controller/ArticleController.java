package com.example.article_microservice.Controller;

import com.example.article_microservice.DTO.ArticleDTO;
import com.example.article_microservice.Service.Interface.ArticleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/article")
public class ArticleController {
    @Autowired
    ArticleService articleService;
    @PostMapping("/publishArticle")
    public ResponseEntity<?> publishArticle(@Valid @RequestBody ArticleDTO articleDTO) {
        return articleService.publishArticle(articleDTO);
    }
    @GetMapping("/searchArticle")
    public ResponseEntity<?> searchQuestion(@RequestBody String term) {
        return articleService.searchArticle(term);
    }
}
