package com.example.article_microservice.Service.Implementation;

import com.example.article_microservice.DTO.Question.CommentDTO;
import com.example.article_microservice.DTO.DoctorDTO;
import com.example.article_microservice.DTO.Question.CommentResponseDTO;
import com.example.article_microservice.DTO.Question.QuestionDetailsResponseDTO;
import com.example.article_microservice.DTO.Question.QuestionSearchResponseDTO;
import com.example.article_microservice.DTO.Question.ReceivedQuestionDTO;
import com.example.article_microservice.DTO.Question.VoteDTO;
import com.example.article_microservice.Model.*;
import com.example.article_microservice.Repository.CommentRepository;
import com.example.article_microservice.Repository.DoctorRepository;
import com.example.article_microservice.Repository.QuestionRepository;
import com.example.article_microservice.Repository.VoteRepository;
import com.example.article_microservice.Service.Interface.QuestionService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public ResponseEntity<?> postQuestion(ReceivedQuestionDTO questionDTO) {
        /*
            SRS: Publishing questions
            PATM: (PA_PHCF_P1)
        */

        Question question = new Question();
        question.setTitle(questionDTO.getTitle());
        question.setContent(questionDTO.getContent());
        question.setQuestionTime(questionDTO.getQuestionTime());
        question.setPatientWrittenName(questionDTO.getPatientWrittenName());

        try {
            questionRepository.save(question);
            return ResponseEntity.status(HttpStatus.CREATED).body("Question posted successfully");
        } catch (Exception e){
            return ResponseEntity.internalServerError().body("An unexpected error occurred. " +
                    "Please try again later.");
        }
    }

    @Override
    public ResponseEntity<?> searchQuestion(String term, int page, int size){
        if (term == null || term.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Search term cannot be empty");
        }
        String cleanedTerm = term.trim();
        String tsQuery = Arrays.stream(cleanedTerm.split("\\..s+"))
                .filter(word -> word.length() > 1) // filter stop-words better
                .collect(Collectors.joining(" | "));

        if (tsQuery.isBlank()) {
            Page<QuestionSearchResponseDTO> emptyPage = new PageImpl<>(Collections.emptyList(), PageRequest.of(page, size), 0);
            return ResponseEntity.ok(emptyPage);
        }
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Question> resultPage = questionRepository.searchByRelevance(tsQuery, pageable);
            Page<QuestionSearchResponseDTO> responsePage = resultPage.map(QuestionSearchResponseDTO::new);
            return ResponseEntity.ok(responsePage);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Change the search terms to" +
                    " make them more distinctive and retry");
        }
    }

    @Override
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
            comment.setContent(commentDTO.getContent());
            comment.setTime(commentDTO.getCommentTime());

            Comment response = commentRepository.save(comment);
            CommentResponseDTO commentResponseDTO = new CommentResponseDTO(response.getId(), response.getContent(),
                    response.getTime(), response.getDoctor().getName(),
                    0);
            return ResponseEntity.status(HttpStatus.CREATED).body(commentResponseDTO);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while saving comment, try again");
        }
    }

    @Override
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
    @Override
    public ResponseEntity<?> getCommentsOnQuestion(Long questionId) {
        Optional<Question> questionOptional = questionRepository.findById(questionId);
        if (questionOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Question not found");
        }
        try {
            Question question = questionOptional.get();
            List<CommentResponseDTO> commentResponses = new ArrayList<>();

            for (Comment comment : question.getComments()) {
                int voteCount = comment.getVotes().stream()
                        .mapToInt(vote -> vote.getRank())
                        .sum();

                CommentResponseDTO commentResponse = new CommentResponseDTO(
                        comment.getId(),
                        comment.getContent(),
                        comment.getTime(),
                        comment.getDoctor().getName(),
                        voteCount
                );
                commentResponses.add(commentResponse);
            }

            QuestionDetailsResponseDTO questionDetails = new QuestionDetailsResponseDTO(
                    question.getId(),
                    question.getTitle(),
                    question.getContent(),
                    question.getPatientWrittenName(),
                    question.getQuestionTime(),
                    commentResponses
            );

            return ResponseEntity.ok().body(questionDetails);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while retrieving comments, please retry");
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
        Optional<Vote> voteExist = voteRepository.findById(voteId);
        int r;
        if(voteExist.isPresent() && (voteDTO.getRank() + voteExist.get().getRank() == 0))
            r = 0;
        else
            r = voteDTO.getRank();
        Vote vote = voteExist.orElseGet(Vote::new);
        vote.setRank(r);
        vote.setComment(commentOptional.get());
        vote.setDoctor(doctor.get());

        vote.setVoteId(voteId);
        try {
            Vote response = voteRepository.save(vote);
            Comment comm = commentRepository.findById(voteDTO.getCommentId()).get();

            VoteDTO responseVoteDTO = new VoteDTO(response.getComment().getId(), response.getDoctor().getId(),
                    comm.getVotes().stream()
                            .mapToInt(v -> v.getRank())
                            .sum());
            return ResponseEntity.status(HttpStatus.CREATED).body(responseVoteDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while adding your vote" +
                    ", please retry");
        }

    }
}
