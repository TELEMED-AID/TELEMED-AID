package com.example.article_microservice.Repository;

import com.example.article_microservice.Model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends
        JpaRepository<Article, Long> {
}
