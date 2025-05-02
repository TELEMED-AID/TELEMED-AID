package com.appointments.appointmentservice.Repositories;

import com.appointments.appointmentservice.Entities.Appointment;
import com.appointments.appointmentservice.Entities.AppointmentID;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MakeAppointment extends JpaRepository<Appointment, AppointmentID> {
    boolean existsById(@NonNull AppointmentID id);
    List<Appointment> findByIdUserID(String userID);
    List<Appointment> findByIdDoctorID(String doctorID);
}