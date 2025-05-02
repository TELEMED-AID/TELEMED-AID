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
public class MakeAppointment {
    private String UserId;
    private String DoctorId;
    private LocalDate Date;
    private LocalTime time;
    private AppointmentState State;
}
