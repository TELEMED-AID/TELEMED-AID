package com.appointments.appointmentservice.Service;

import com.appointments.appointmentservice.Config.DoctorServiceClient;
import com.appointments.appointmentservice.DTOs.AppointmentResponseDTO;
import com.appointments.appointmentservice.Entities.Appointment;
import com.appointments.appointmentservice.Repositories.MakeAppointment;
import com.appointments.appointmentservice.DTOs.DoctorDataDTO;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentQueryService {
    private final MakeAppointment appointmentRepository;
    private final DoctorServiceClient doctorServiceClient;

<<<<<<< Updated upstream
    public List<AppointmentResponseDTO> getAppointmentsForPatient(String userId, String doctorIdFilter) {
=======
    public List<AppointmentResponseDTO> getAppointmentsForPatient(String userId, Long doctorIdFilter) {
>>>>>>> Stashed changes
        List<Appointment> appointments;
        if (doctorIdFilter != null) {
            appointments = appointmentRepository.findByIdUserIDAndIdDoctorID(userId, doctorIdFilter);
        } else {
            appointments = appointmentRepository.findByIdUserID(userId);
        }

        return appointments.stream()
                .map(appointment -> {
                    DoctorDataDTO doctorDetails = doctorServiceClient.getDoctorById(appointment.getId().getDoctorID());
                    return AppointmentResponseDTO.builder()
                            .userId(appointment.getId().getUserID())
                            .doctorDetails(doctorDetails)
                            .date(appointment.getId().getAppointmentDate())
                            .time(appointment.getId().getAppointmentTime())
                            .state(appointment.getAppointmentState())
                            .build();
                })
                .collect(Collectors.toList());
    }
}