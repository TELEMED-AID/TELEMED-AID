package com.appointments.appointmentservice.Repositories;

import com.appointments.appointmentservice.Entities.Appointment;
import com.appointments.appointmentservice.Entities.AppointmentID;
import com.appointments.appointmentservice.Entities.AppointmentState;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MakeAppointment extends JpaRepository<Appointment, AppointmentID> {
    boolean existsById(@NonNull AppointmentID id);
    List<Appointment> findByIdUserID(String userID);
    List<Appointment> findByIdDoctorID(Long doctorID);
    List<Appointment> findByIdUserIDAndIdDoctorID(String userID, Long doctorID);
    void deleteByAppointmentStateAndId_AppointmentDateBefore(AppointmentState state, LocalDate date);
    @Modifying
    @Query("UPDATE Appointment a SET a.appointmentState = :newState WHERE a.appointmentState = :currentState AND a.id.appointmentDate < :currentDate")
    void updateAppointmentStateByDateBefore(AppointmentState currentState, AppointmentState newState, LocalDate currentDate);
}