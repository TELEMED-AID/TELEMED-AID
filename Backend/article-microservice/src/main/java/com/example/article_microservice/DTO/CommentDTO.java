package com.example.article_microservice.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.Instant;
@Data
public class CommentDTO {
    @NotNull(message = "No doctor national id is given")
    private Long doctorId;

    @NotBlank(message = "Empty comment")
    private String content;

    @NotNull(message = "No question ID given")
    private Long questionId;

    @NotNull(message = "No given time")
    private Instant questionTime;
}

