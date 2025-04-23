package com.example.article_microservice.Repository;

import com.example.article_microservice.Model.Article;
import com.example.article_microservice.Model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends
        JpaRepository<Article, Long> {
    @Query(value = """
        SELECT * FROM article
        WHERE search_vector @@ to_tsquery('english', :term)
        ORDER BY ts_rank(search_vector, to_tsquery('english', :term)) DESC
        """, nativeQuery = true)
    List<Article> searchByRelevance(@Param("term") String term);
}
