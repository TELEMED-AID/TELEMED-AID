package com.example.telemid_aid.enricher.config;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.telemid_aid.enricher.dto.DoctorDto;

@FeignClient(name = "article-service", url = "${article.service.url}")
public interface ArticleServiceClient {

    @PostMapping("/api/articles/doctors")
    void sendDoctorData(@RequestBody DoctorDto doctorDto);
}