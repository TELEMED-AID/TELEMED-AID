package com.example.article_microservice.Controller;

import com.example.article_microservice.DTO.CommentDTO;
import com.example.article_microservice.DTO.DoctorDTO;
import com.example.article_microservice.DTO.QuestionDTO;
import com.example.article_microservice.DTO.VoteDTO;
import com.example.article_microservice.Service.Interface.QuestionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@CrossOrigin
@RequestMapping("/article/question")

public class QuestionController {
    @Autowired
    private QuestionService questionService;
    @PostMapping("/publishQuestion")
    public ResponseEntity<?> publishQuestion(@Valid @RequestBody QuestionDTO questionDTO) {
        return questionService.postQuestion(questionDTO);
    }
    @GetMapping("/searchQuestion")
    public ResponseEntity<?> searchQuestion(@RequestBody String term) {
        return questionService.searchQuestion(term);
    }
    @PostMapping("/commentQuestion")
    public ResponseEntity<?> commentOnQuestion(@Valid @RequestBody CommentDTO commentDTO) {
        return questionService.commentOnQuestion(commentDTO);
    }
    @PostMapping("/addDoctor")
    public ResponseEntity<?> addDoctor(@Valid @RequestBody DoctorDTO doctorDTO) {
        // Add service could have been put in the article service also
        return questionService.addDoctor(doctorDTO);
    }
    @GetMapping("/getCommentsOnPost/{questionId}")
    public ResponseEntity<?> getCommentsOnQuestion(@PathVariable Long questionId) {
        return questionService.getCommentsOnQuestion(questionId);
    }
    @PostMapping("/addVote")
    public ResponseEntity<?> addVote(@Valid @RequestBody VoteDTO voteDTO) {
        return questionService.addVoteToQuestion(voteDTO);
    }
}
