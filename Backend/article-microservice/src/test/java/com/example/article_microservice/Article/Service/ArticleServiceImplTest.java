package com.example.article_microservice.Article.Service;

import com.example.article_microservice.DTO.Article.ReceivedArticleDTO;
import com.example.article_microservice.Model.Article;
import com.example.article_microservice.Model.EnrichedDoctor;
import com.example.article_microservice.Repository.ArticleRepository;
import com.example.article_microservice.Repository.EnrichedDoctorRepository;
import com.example.article_microservice.Service.Implementation.ArticleServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;

import java.time.Instant;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ArticleServiceImplTest {

    @InjectMocks
    private ArticleServiceImpl articleService;

    @Mock
    private ArticleRepository articleRepository;

    @Mock
    private EnrichedDoctorRepository enrichedDoctorRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // TC-ART-1: Valid Article Publishing Request
    @Test
    void testPublishArticle_ValidRequest_ReturnsCreated() {
        ReceivedArticleDTO dto = new ReceivedArticleDTO();
        dto.setTitle("Heart Health Tips");
        dto.setContent("Here are five practical tips...");
        dto.setCategory("Cardiology");
        dto.setArticleTime(Instant.parse("2025-05-08T10:15:00Z"));
        dto.setDoctorId(12345678901234L);

        EnrichedDoctor doctor = new EnrichedDoctor();
        doctor.setId(12345678901234L);

        when(enrichedDoctorRepository.findById(dto.getDoctorId())).thenReturn(Optional.of(doctor));

        ResponseEntity<?> response = articleService.publishArticle(dto);

        assertEquals(201, response.getStatusCodeValue());
        verify(articleRepository, times(1)).save(any(Article.class));
    }

    // TC-ART-2: Invalid Article Publishing Request (non-existent doctor)
    @Test
    void testPublishArticle_DoctorNotFound_ReturnsNotFound() {
        ReceivedArticleDTO dto = new ReceivedArticleDTO();
        dto.setTitle("Heart Health Tips");
        dto.setContent("Tips...");
        dto.setCategory("Cardiology");
        dto.setArticleTime(Instant.now());
        dto.setDoctorId(999L);

        when(enrichedDoctorRepository.findById(999L)).thenReturn(Optional.empty());

        ResponseEntity<?> response = articleService.publishArticle(dto);

        assertEquals(404, response.getStatusCodeValue());
        verify(articleRepository, never()).save(any());
    }

    // TC-ART-3: General Exception Handling
    @Test
    void testPublishArticle_SaveThrowsException_ReturnsInternalServerError() {
        ReceivedArticleDTO dto = new ReceivedArticleDTO();
        dto.setTitle("Health Tips");
        dto.setContent("Tips...");
        dto.setCategory("Cardiology");
        dto.setArticleTime(Instant.now());
        dto.setDoctorId(1L);

        EnrichedDoctor doctor = new EnrichedDoctor();
        doctor.setId(1L);

        when(enrichedDoctorRepository.findById(1L)).thenReturn(Optional.of(doctor));
        when(articleRepository.save(any())).thenThrow(RuntimeException.class);

        ResponseEntity<?> response = articleService.publishArticle(dto);

        assertEquals(500, response.getStatusCodeValue());
    }

    // TC-ART-4: Empty Search Term
    @Test
    void testSearchArticle_EmptyTerm_ReturnsBadRequest() {
        ResponseEntity<?> response = articleService.searchArticle(" ", 0, 10);
        assertEquals(400, response.getStatusCodeValue());
    }

    // TC-ART-5: Search Term Contains Only Single Characters
    @Test
    void testSearchArticle_OnlySingleCharacterWords_ReturnsEmptyPage() {
        ResponseEntity<?> response = articleService.searchArticle("a b c", 0, 10);
        assertEquals(200, response.getStatusCodeValue());
    }

    // TC-ART-6: Search Backend Exception
    @Test
    void testSearchArticle_BackendException_ReturnsBadRequest() {
        when(articleRepository.searchByRelevance(anyString(), any())).thenThrow(RuntimeException.class);
        ResponseEntity<?> response = articleService.searchArticle("valid term", 0, 10);
        assertEquals(400, response.getStatusCodeValue());
    }

    // TC-ART-7: Trimming Whitespace in Search Term
    @Test
    void testSearchArticle_TrimmedWhitespaceTerm() {
        Page<Article> articlePage = new PageImpl<>(Collections.emptyList());
        when(articleRepository.searchByRelevance(anyString(), any())).thenReturn(articlePage);

        ResponseEntity<?> response = articleService.searchArticle("  term  ", 0, 10);
        assertEquals(200, response.getStatusCodeValue());
    }

    // TC-ART-8: Valid Article ID
    @Test
    void testGetCertainArticle_ValidId_ReturnsArticle() {
        Article article = new Article();
        article.setId(1L);
        article.setTitle("T1");
        article.setContent("C1");
        article.setCategory("Cardiology");
        article.setArticleTime(Instant.now());
        article.setEnrichedDoctorId(123L);

        when(articleRepository.findById(1L)).thenReturn(Optional.of(article));

        ResponseEntity<?> response = articleService.getCertainArticle(1L);
        assertEquals(200, response.getStatusCodeValue());
    }

    // TC-ART-9: Non-existent Article ID
    @Test
    void testGetCertainArticle_NotFound() {
        when(articleRepository.findById(2L)).thenReturn(Optional.empty());

        ResponseEntity<?> response = articleService.getCertainArticle(2L);
        assertEquals(404, response.getStatusCodeValue());
    }

    // TC-ART-10: Exception during Article Lookup
    @Test
    void testGetCertainArticle_Exception_ReturnsBadRequest() {
        when(articleRepository.findById(3L)).thenThrow(RuntimeException.class);

        ResponseEntity<?> response = articleService.getCertainArticle(3L);
        assertEquals(400, response.getStatusCodeValue());
    }
}
