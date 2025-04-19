package com.example.article_microservice.Service.Interface;

import com.example.article_microservice.DTO.CommentDTO;
import com.example.article_microservice.DTO.DoctorDTO;
import com.example.article_microservice.DTO.QuestionDTO;
import org.springframework.http.ResponseEntity;

public interface QuestionService {
    ResponseEntity<?> postQuestion(QuestionDTO questionDTO);
    ResponseEntity<?> searchQuestion(String term);
    ResponseEntity<?> commentOnQuestion(CommentDTO commentDTO);
    ResponseEntity<?> addDoctor(DoctorDTO doctorDTO);
    ResponseEntity<?> getCommentsOnQuestion(Long id);
}
