package com.example.article_microservice.Controller;

import com.example.article_microservice.DTO.QuestionDTO;
import com.example.article_microservice.Service.Interface.QuestionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/question")
// Now it can accept requests from any requester
// If I set it to origins = "http://localhost:3000", it'll be
// restricted to requests from this port only
public class QuestionController {
    @Autowired
    private QuestionService questionService;
    @PostMapping("/publish")
    public ResponseEntity<?> publishQuestion(@Valid @RequestBody QuestionDTO questionDTO) {
        return questionService.postQuestion(questionDTO);
    }
    @GetMapping("/search")
    public ResponseEntity<?> searchQuestion(@RequestBody String term) {
        return questionService.searchQuestion(term);
    }
}
