package com.appointments.appointmentservice.Service;

import com.appointments.appointmentservice.Entities.AppointmentState;
import com.appointments.appointmentservice.Repositories.MakeAppointment;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AppointmentCleanup {
    private final MakeAppointment appointmentRepository;

    @Scheduled(cron = "0 0 1 * * ?") // Runs daily at 1 AM
    @Transactional
    public void updateAppointmentsToCompleted() {
        try {
            appointmentRepository.updateAppointmentStateByDateBefore(
                    AppointmentState.PENDING, AppointmentState.COMPLETED, LocalDate.now());
            System.out.println("Appointments updated to COMPLETED successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error during appointment state update.");
        }
    }
}