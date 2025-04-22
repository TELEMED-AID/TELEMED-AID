package com.example.article_microservice.Service.Implementation;

import com.example.article_microservice.DTO.ArticleDTO;
import com.example.article_microservice.Model.Article;
import com.example.article_microservice.Model.Doctor;
import com.example.article_microservice.Repository.ArticleRepository;
import com.example.article_microservice.Repository.DoctorRepository;
import com.example.article_microservice.Service.Interface.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

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

}
