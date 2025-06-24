package com.appointments.appointmentservice.Service;

import com.appointments.appointmentservice.Entities.Appointment;
import com.appointments.appointmentservice.Entities.AppointmentID;
import com.appointments.appointmentservice.Entities.AppointmentState;
import com.appointments.appointmentservice.Repositories.MakeAppointment;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class BookAppointment {
    private final MakeAppointment appointmentRepository;
    @Transactional
    public boolean bookAppointment(Long userID, Long doctorID, LocalDate date, LocalTime time) {
        if (userID == null || doctorID == null || date == null || time == null) {
            return false;
        }
        if (date.isBefore(LocalDate.now()) || (date.isEqual(LocalDate.now()) && time.isBefore(LocalTime.now()))) {
            return false;
        }

        AppointmentID appointmentID = new AppointmentID(userID, doctorID, date, time);

        if (appointmentRepository.existsById(appointmentID)) {
            System.out.println("already exist");
            return false;
        }
        try {
            System.out.println("I will book appointment");
            Appointment appointment = Appointment.builder()
                    .id(appointmentID)
                    .appointmentState(AppointmentState.PENDING)
                    .build();
            appointmentRepository.save(appointment);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
}