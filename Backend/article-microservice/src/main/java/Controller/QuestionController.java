package Controller;

import DTO.QuestionDTO;
import Service.Interface.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
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
    @PostMapping("/publishQuestion")
    public ResponseEntity<String> publishQuestion(@RequestBody QuestionDTO questionDTO) {
        return questionService.postQuestion(questionDTO);
    }
}
