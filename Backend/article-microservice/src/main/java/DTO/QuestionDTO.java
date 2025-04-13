package DTO;

import lombok.Data;

import java.time.Instant;

@Data
public class QuestionDTO {
    private String patientWrittenName;
    private String content;
    private Instant questionTime;
}
