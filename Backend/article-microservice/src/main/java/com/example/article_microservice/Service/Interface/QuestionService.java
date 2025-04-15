package com.example.article_microservice.Service.Interface;

import com.example.article_microservice.DTO.QuestionDTO;
import org.springframework.http.ResponseEntity;

public interface QuestionService {
    ResponseEntity<?> postQuestion(QuestionDTO questionDTO);
}
