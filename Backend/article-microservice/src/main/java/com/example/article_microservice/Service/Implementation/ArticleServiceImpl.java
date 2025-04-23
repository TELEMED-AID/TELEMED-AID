package com.example.article_microservice.Service.Implementation;

import com.example.article_microservice.DTO.ArticleDTO;
import com.example.article_microservice.Model.Article;
import com.example.article_microservice.Model.Doctor;
import com.example.article_microservice.Model.Question;
import com.example.article_microservice.Repository.ArticleRepository;
import com.example.article_microservice.Repository.DoctorRepository;
import com.example.article_microservice.Service.Interface.ArticleService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ArticleServiceImpl implements ArticleService {
    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private DoctorRepository doctorRepository;
    public ResponseEntity<?> publishArticle(ArticleDTO articleDTO){
        Article article = new Article();
        article.setTitle(articleDTO.getTitle());
        article.setContent(articleDTO.getContent());
        article.setArticleTime(articleDTO.getArticleTime());
        article.setCategory(articleDTO.getCategory());
        Optional<Doctor> doctorOptional = doctorRepository.findById(articleDTO.getDoctorNationalId());
        if (doctorOptional.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor not found");
        article.setDoctor(doctorOptional.get());
        try{
            articleRepository.save(article);
            return ResponseEntity.status(HttpStatus.CREATED).body("Article saved successfully");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while saving article, try again");
        }
    }
    @Transactional
    @Override
    public ResponseEntity<?> searchArticle(String term){
        if (term == null || term.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Search term cannot be empty");
        }
        String cleanedTerm = term.trim();
        String tsQuery = Arrays.stream(cleanedTerm.split("\\s+"))
                .filter(word -> word.length() > 1) // filter stop-words better
                .collect(Collectors.joining(" | "));
        System.out.println(tsQuery);
        if (tsQuery.isBlank()) {
            return ResponseEntity.ok(Collections.emptyList());
        }
      //  try {
            List<Article> results = articleRepository.searchByRelevance(tsQuery);
            return ResponseEntity.ok(results);
        //} catch (Exception e){
          //  return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Change the search terms to" +
            //        " make them more distinctive and retry");
        //}

    }
}
