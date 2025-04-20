package com.example.article_microservice.Service.Implementation;

import com.example.article_microservice.DTO.CommentDTO;
import com.example.article_microservice.DTO.DoctorDTO;
import com.example.article_microservice.DTO.QuestionDTO;
import com.example.article_microservice.DTO.VoteDTO;
import com.example.article_microservice.Model.*;
import com.example.article_microservice.Repository.CommentRepository;
import com.example.article_microservice.Repository.DoctorRepository;
import com.example.article_microservice.Repository.QuestionRepository;
import com.example.article_microservice.Repository.VoteRepository;
import com.example.article_microservice.Service.Interface.QuestionService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImpl implements QuestionService {
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private VoteRepository voteRepository;
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
            return ResponseEntity.internalServerError().body("An unexpected error occurred. " +
                    "Please try again later.");
        }
    }

    @Override
    public ResponseEntity<?> searchQuestion(String term){
        if (term == null || term.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Search term cannot be empty");
        }
        String cleanedTerm = term.trim();
        String tsQuery = Arrays.stream(cleanedTerm.split("\\s+"))
                .filter(word -> word.length() > 1) // filter stop-words better
                .collect(Collectors.joining(" | "));

        if (tsQuery.isBlank()) {
            return ResponseEntity.ok(Collections.emptyList());
        }
        try {
            List<Question> results = questionRepository.searchByRelevance(tsQuery);
            return ResponseEntity.ok(results);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Change the search terms to" +
                    " make them more distinctive and retry");
        }

    }

    public ResponseEntity<?> commentOnQuestion(CommentDTO commentDTO) {
        Optional<Doctor> doctorOptional = doctorRepository.findById(commentDTO.getDoctorId());
        if (doctorOptional.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor not found");

        Optional<Question> questionOptional = questionRepository.findById(commentDTO.getQuestionId());
        if (questionOptional.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Question not found");

        try {
            Comment comment = new Comment();
            comment.setDoctor(doctorOptional.get());
            comment.setQuestion(questionOptional.get());
            System.out.println(commentDTO.getContent());
            comment.setContent(commentDTO.getContent());
            comment.setTime(commentDTO.getQuestionTime());

            commentRepository.save(comment);

            return ResponseEntity.status(HttpStatus.CREATED).body("Comment saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while saving comment, try again");
        }
    }
    public ResponseEntity<?> addDoctor(DoctorDTO doctorDTO){
        if (doctorRepository.existsById(doctorDTO.getId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Doctor with this ID already exists");
        }
        try {
            Doctor doctor = new Doctor();
            doctor.setId(doctorDTO.getId());
            doctor.setName(doctorDTO.getName());
            doctor.setCareerLevel(doctorDTO.getCareerLevel());
            doctor.setSpecializationName(doctorDTO.getSpecializationName());
            doctor.setArticles(new ArrayList<>());
            doctor.setComments(new ArrayList<>());

            doctorRepository.save(doctor);

            return ResponseEntity.status(HttpStatus.CREATED).body("Doctor added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while saving doctor, retry please");
        }
    }
    // Comments needs to be modified: get votes along with the request (Create comment response DTO)
    @Transactional
    public ResponseEntity<?> getCommentsOnQuestion(Long questionId) {
        Optional<Question> questionOptional = questionRepository.findById(questionId);
        if (questionOptional.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Question not found");
        try{
            return ResponseEntity.ok().body(commentRepository.findAllByQuestionId(questionId));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while retrieving comments" +
                    ", please retry");
        }
    }
    public ResponseEntity<?> addVoteToQuestion(VoteDTO voteDTO){
        Optional<Comment> commentOptional = commentRepository.findById(voteDTO.getCommentId());
        if(commentOptional.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Comment not found");
        }
        Optional<Doctor> doctor = doctorRepository.findById(voteDTO.getDoctorId());
        if(doctor.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor not found");
        }
        VoteId voteId = new VoteId(voteDTO.getDoctorId(),
                voteDTO.getCommentId());

        Vote vote = new Vote();
        vote.setVote(voteDTO.getRank());
        vote.setComment(commentOptional.get());
        vote.setDoctor(doctor.get());

        vote.setVoteId(voteId);
        try {
            voteRepository.save(vote);
            return ResponseEntity.status(HttpStatus.CREATED).body("Vote added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while adding your vote" +
                    ", please retry");
        }

    }
}
