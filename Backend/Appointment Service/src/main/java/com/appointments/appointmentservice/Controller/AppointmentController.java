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
@RequestMapping("/api/appointments")
@RequestMapping("/api/appointment")
@RequiredArgsConstructor
public class AppointmentController {
    private final BookAppointment bookAppointmentService;
    private final CancelAppointment cancelAppointmentService;
    private final AppointmentQueryService appointmentQueryService;

    @PostMapping("/book")
    public ResponseEntity<String> bookAppointment(@RequestBody MakeAppointmentDTO request) {
        boolean success = bookAppointmentService.bookAppointment(request.getUserId(), request.getDoctorId(), request.getDate(), request.getTime());
        if (success) {
            return ResponseEntity.ok("Appointment booked successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to book appointment");
        }
    }
    @PostMapping("/cancel")
    public ResponseEntity<String> cancelAppointment(@RequestBody MakeAppointmentDTO request) {
        boolean success = cancelAppointmentService.cancelAppointment(request.getUserId(), request.getDoctorId(), request.getDate(), request.getTime());
        if (success) {
            return ResponseEntity.ok("Appointment canceled successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to cancel appointment");
        }
    }
    @GetMapping("/patient/{userId}")
    public ResponseEntity<List<AppointmentResponseDTO>> getPatientAppointments(
            @PathVariable String userId) {
        return ResponseEntity.ok(appointmentQueryService.getAppointmentsForPatient(userId, null));
    }

    @GetMapping("/patient/{userId}/doctor/{doctorId}")
    public ResponseEntity<List<AppointmentResponseDTO>> getPatientAppointmentsWithDoctor(
            @PathVariable String userId,
            @PathVariable Long doctorId) {
        return ResponseEntity.ok(appointmentQueryService.getAppointmentsForPatient(userId, doctorId));
    }
}
