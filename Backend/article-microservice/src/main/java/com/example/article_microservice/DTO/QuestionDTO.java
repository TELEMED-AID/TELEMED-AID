package com.example.article_microservice.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.Instant;

@Data
public class QuestionDTO {
    @NotBlank(message = "Please give a name to yourself even it's fake")
    private String patientWrittenName;
    @NotBlank(message = "Empty question")
    private String content;
    @NotBlank(message = "Empty title")
    private String title;
    @NotNull(message = "No given time")
    private Instant questionTime;
}
