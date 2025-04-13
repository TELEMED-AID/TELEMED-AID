package Service.Implementation;

import DTO.QuestionDTO;
import Service.Interface.QuestionService;
import org.springframework.http.ResponseEntity;

public class QuestionServiceImpl implements QuestionService {


    @Override
    public ResponseEntity<String> postQuestion(QuestionDTO questionDTO) {
        return null;
    }
}
