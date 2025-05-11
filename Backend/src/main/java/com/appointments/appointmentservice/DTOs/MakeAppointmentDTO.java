package com.appointments.appointmentservice.DTOs;

import com.appointments.appointmentservice.Entities.AppointmentState;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Builder
public class MakeAppointmentDTO {
    private String UserId;
<<<<<<< Updated upstream
    private String DoctorId;
=======
    private Long DoctorId;
>>>>>>> Stashed changes
    private LocalDate Date;
    private LocalTime time;
    private AppointmentState State;
}
