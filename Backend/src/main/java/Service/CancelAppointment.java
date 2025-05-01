package Service;

import Entities.AppointmentID;
import Repositories.MakeAppointment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class CancelAppointment {
    private final MakeAppointment appointmentRepository;
    public boolean cancelAppointment(String userID, String doctorID, LocalDate date, LocalTime time) {
        if (userID == null || doctorID == null || date == null || time == null) {
            return false;
        }

        try {
            appointmentRepository.deleteById(new AppointmentID(userID, doctorID, date, time));
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
