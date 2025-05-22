package com.example.article_microservice.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KafkaEnricherDTO {
    private Long id;
    private String name;
    private String careerLevel;
    private String specializationName;
}
