package com.example.article_microservice.Service.Implementation;

import com.example.article_microservice.DTO.QuestionDTO;
import com.example.article_microservice.Model.Question;
import com.example.article_microservice.Repository.QuestionRepository;
import com.example.article_microservice.Service.Interface.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class QuestionServiceImpl implements QuestionService {
    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public ResponseEntity<?> postQuestion(QuestionDTO questionDTO) {
        // Question DTO has no empty and null value
        // Guaranteed from the valid annotation in the controller
        // Question DTO also has the right types of variables
        // Guaranteed from the serialization before the controller itself
        // Any save failure from the database is likely a strange server
        // error that needs to be returned the user to make retry the
        // operation

        Question question = new Question
                (questionDTO.getPatientWrittenName(),
                questionDTO.getContent(),
                questionDTO.getTitle(),
                questionDTO.getQuestionTime());
        try {
            questionRepository.save(question);
            return ResponseEntity.status(HttpStatus.CREATED).body("Question posted successfully");
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred. " +
                    "Please try again later.");
        }
    }


}
