package com.example.article_microservice.Repository;

import com.example.article_microservice.Model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends
        JpaRepository<Question, Integer> {
    @Query(value = """
        SELECT * FROM question
        WHERE search_vector @@ plainto_tsquery(:term)
        ORDER BY ts_rank(search_vector, plainto_tsquery(:term)) DESC
        """, nativeQuery = true)
    List<Question> searchByRelevance(@Param("term") String term);
}
