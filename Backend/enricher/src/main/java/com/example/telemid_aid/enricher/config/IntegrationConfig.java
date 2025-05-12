package com.example.telemid_aid.enricher.config;

import com.example.telemid_aid.enricher.dto.DoctorDto;
import com.example.telemid_aid.enricher.service.ArticleService;
import com.example.telemid_aid.enricher.service.DoctorService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.dsl.IntegrationFlow;
import org.springframework.integration.channel.DirectChannel;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;

@Configuration
public class IntegrationConfig {

    @Bean
    public MessageChannel doctorIdChannel() {
        return new DirectChannel();
    }

    @Bean
    public MessageChannel enrichDoctorChannel() {
        return new DirectChannel();
    }

    @Bean
    public IntegrationFlow enricherFlow(DoctorService doctorService, ArticleService articleService) {
        return flow -> flow
                .channel(doctorIdChannel())
                .enrich(enricher -> enricher
                        .requestChannel(enrichDoctorChannel())
                        .requestPayload(Message::getPayload)
                        .<DoctorDto>headerFunction("doctor",
                                message -> message.getPayload()) // Use reply directly
                )
                .handle(articleService::processEnrichedDoctor);
    }

    @Bean
    public IntegrationFlow doctorEnrichmentFlow(DoctorService doctorService) {
        return flow -> flow
                .channel(enrichDoctorChannel())
                .<Long>handle((payload, headers) -> {
                    System.out.println("Fetching doctor data...");
                    return doctorService.fetchDoctorById(payload);
                });
    }
}