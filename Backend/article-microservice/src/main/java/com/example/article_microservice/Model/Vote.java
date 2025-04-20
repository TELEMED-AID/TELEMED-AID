package com.example.article_microservice.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Entity
@NoArgsConstructor
public class Vote {
    @EmbeddedId
    private VoteId voteId;
    @ManyToOne
    @MapsId("doctorId")
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;
    @ManyToOne
    @MapsId("commentId")
    @JoinColumn(name = "comment_id")
    @JsonBackReference
    private Comment comment;
    private byte vote;
}
