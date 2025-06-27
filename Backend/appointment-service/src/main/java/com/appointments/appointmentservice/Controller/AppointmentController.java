package com.appointments.appointmentservice.Controller;

import com.appointments.appointmentservice.DTOs.AppointmentResponseDTO;
import com.appointments.appointmentservice.DTOs.MakeAppointmentDTO;
import com.appointments.appointmentservice.Service.AppointmentQueryService;
import com.appointments.appointmentservice.Service.BookAppointment;
import com.appointments.appointmentservice.Service.CancelAppointment;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointment")
@RequiredArgsConstructor
public class AppointmentController {
    private final BookAppointment bookAppointmentService;
    private final CancelAppointment cancelAppointmentService;
    private final AppointmentQueryService appointmentQueryService;

    @PostMapping("/book")
    public ResponseEntity<String> bookAppointment(@RequestBody MakeAppointmentDTO request) {
        System.out.println("request: " + request);
        boolean success = bookAppointmentService.bookAppointment(request.getUserId(), request.getDoctorId(), request.getDate(), request.getTime());
        if (success) {
            return ResponseEntity.ok("Appointment booked successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to book appointment");
        }
    }
    @DeleteMapping("/cancel")
    public ResponseEntity<?> cancelAppointment(@RequestBody MakeAppointmentDTO request) {
        try {
            boolean success = cancelAppointmentService.cancelAppointment(
                    request.getUserId(),
                    request.getDoctorId(),
                    request.getDate(),
                    request.getTime()
            );

            if (success) {
                return ResponseEntity.ok().build(); // 204 might be more appropriate
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Error canceling appointment: " + e.getMessage());
        }
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AppointmentResponseDTO>> getUserAppointments(
            @PathVariable Long userId) {
        return ResponseEntity.ok(appointmentQueryService.getAppointmentsForUser(userId, null));
    }

    @GetMapping("/user/{userId}/as-doctor/count")
    public ResponseEntity<Long> getAppointmentCountWhereUserIsDoctor(
            @PathVariable Long userId) {
        return ResponseEntity.ok(appointmentQueryService.countAppointmentsWhereUserIsDoctor(userId));
    }

    @GetMapping("/user/{userId}/doctor/{doctorId}")
    public ResponseEntity<List<AppointmentResponseDTO>> getUserAppointmentsWithDoctor(
            @PathVariable Long userId,
            @PathVariable Long doctorId) {
        return ResponseEntity.ok(appointmentQueryService.getAppointmentsForUser(userId, doctorId));
    }
}
