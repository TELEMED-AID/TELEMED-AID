package Controller;

import DTOs.MakeAppointment;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import Service.*;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {
    private final BookAppointment bookAppointmentService;
    private final CancelAppointment cancelAppointmentService;

    @PostMapping("/book")
    public ResponseEntity<String> bookAppointment(@RequestBody MakeAppointment request) {
        boolean success = bookAppointmentService.bookAppointment(request.getUserId(), request.getDoctorId(), request.getDate(), request.getTime());
        if (success) {
            return ResponseEntity.ok("Appointment booked successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to book appointment");
        }
    }
    @PostMapping("/cancel")
    public ResponseEntity<String> cancelAppointment(@RequestBody MakeAppointment request) {
        boolean success = cancelAppointmentService.cancelAppointment(request.getUserId(), request.getDoctorId(), request.getDate(), request.getTime());
        if (success) {
            return ResponseEntity.ok("Appointment canceled successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to cancel appointment");
        }
    }
}
