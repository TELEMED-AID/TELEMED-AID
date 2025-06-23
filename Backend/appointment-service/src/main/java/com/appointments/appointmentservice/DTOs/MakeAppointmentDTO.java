package com.appointments.appointmentservice.DTOs;

import com.appointments.appointmentservice.Entities.AppointmentState;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Builder
@ToString
public class MakeAppointmentDTO {
    private String UserId;
    private Long DoctorId;
    private LocalDate Date;
    private LocalTime time;
    private AppointmentState State;
}
