package com.example.telemid_aid.enricher.controller;

import com.example.telemid_aid.enricher.dto.EnrichRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EnricherController {

    private final MessageChannel doctorIdChannel;

    @Autowired
    public EnricherController(MessageChannel doctorIdChannel) {
        this.doctorIdChannel = doctorIdChannel;
    }

    @PostMapping("/api/enrich")
    public ResponseEntity<String> enrichDoctorData(@RequestBody EnrichRequest request) {
        // Send the doctor ID to the integration flow
        boolean sent = doctorIdChannel.send(
                MessageBuilder.withPayload(request.getDoctorId()).build()
        );

        if (sent) {
            return ResponseEntity.ok(
                    "Enrichment process started for doctor ID: " + request.getDoctorId()
            );
        } else {
            return ResponseEntity.badRequest().body("Failed to start enrichment process");
        }
    }
}