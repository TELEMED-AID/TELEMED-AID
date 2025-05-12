package com.example.telemid_aid.enricher.service;

import com.example.telemid_aid.enricher.config.ArticleServiceClient;
import com.example.telemid_aid.enricher.dto.DoctorDto;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Service;

@Service
public class ArticleService {

    private final ArticleServiceClient articleServiceClient;

    public ArticleService(ArticleServiceClient articleServiceClient) {
        this.articleServiceClient = articleServiceClient;
    }

    public void processEnrichedDoctor(Message<?> message) {
        DoctorDto doctor = (DoctorDto) message.getHeaders().get("doctor");
        Long originalDoctorId = (Long) message.getPayload();

        System.out.println("Sending doctor data to Article Service...");
        System.out.println("Original ID: " + originalDoctorId);
        System.out.println("Enriched Data: " + doctor);

        try {
            articleServiceClient.sendDoctorData(doctor);
            System.out.println("Successfully sent doctor data to Article Service");
        } catch (Exception e) {
            System.err.println("Failed to send doctor data: " + e.getMessage());
            throw new RuntimeException("Failed to communicate with Article Service", e);
        }
    }
}