package com.appointments.appointmentservice.Entities;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentID implements Serializable {
    private String userID;
    private Long doctorID;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
}