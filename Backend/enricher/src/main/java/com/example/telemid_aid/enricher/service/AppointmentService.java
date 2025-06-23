package com.example.telemid_aid.enricher.service;

import com.example.telemid_aid.enricher.config.AppointmentServiceClient;
import com.example.telemid_aid.enricher.dto.DoctorAppointmentDTO;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {
    private final AppointmentServiceClient appointmentServiceClient;

    public AppointmentService(AppointmentServiceClient appointmentServiceClient) {
        this.appointmentServiceClient = appointmentServiceClient;
    }

    public void processEnrichedDoctor(Message<?> message) {
        DoctorAppointmentDTO doctor = (DoctorAppointmentDTO) message.getHeaders().get("doctor");
        Long originalDoctorId = (Long) message.getPayload();

        System.out.println("Sending doctor data to Appointment Service...");
        System.out.println("Original ID: " + originalDoctorId);
        System.out.println("Enriched Data: " + doctor);

        try {
            appointmentServiceClient.sendDoctorData(doctor);
            System.out.println("Successfully sent doctor data to Appointment Service");
        } catch (Exception e) {
            System.err.println("Failed to send doctor data: " + e.getMessage());
            throw new RuntimeException("Failed to communicate with Appointment Service", e);
        }
    }
}
