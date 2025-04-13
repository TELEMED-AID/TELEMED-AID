package Service.Interface;

import DTO.QuestionDTO;
import org.springframework.http.ResponseEntity;

public interface QuestionService {
    ResponseEntity<String> postQuestion(QuestionDTO questionDTO);
}
