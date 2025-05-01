package Repositories;

import Entities.Appointment;
import Entities.AppointmentID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MakeAppointment extends JpaRepository<Appointment, AppointmentID> {
    boolean existsById(AppointmentID id);
    List<Appointment> findByIdUserID(String userID);
    List<Appointment> findByIdDoctorID(String doctorID);
}