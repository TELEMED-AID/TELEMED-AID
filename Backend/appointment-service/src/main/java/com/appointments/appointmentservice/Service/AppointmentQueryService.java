package com.appointments.appointmentservice.Service;

import com.appointments.appointmentservice.Config.AppointmentEnrichmentFlowConfig;
import com.appointments.appointmentservice.DTOs.AppointmentResponseDTO;
import com.appointments.appointmentservice.Entities.Appointment;
import com.appointments.appointmentservice.Repositories.MakeAppointment;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.util.List;
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AppointmentQueryService {

    private final MakeAppointment appointmentRepository;
    private final AppointmentEnrichmentFlowConfig.AppointmentEnrichmentGateway enricher;              // ⬅️ new gateway

    /**
     * Return all appointments for a user, optionally narrowed to one doctor,
     * already enriched with that doctor’s details.
     */
    public List<AppointmentResponseDTO> getAppointmentsForUser(
            Long userId, Long doctorIdFilter) {

        List<Appointment> appointments = (doctorIdFilter != null)
                ? appointmentRepository.findById_UserIdAndId_DoctorId(userId, doctorIdFilter)
                : appointmentRepository.findById_UserId(userId);

        // Delegate enrichment of EACH appointment to the Integration flow
        return appointments.stream()
                .map(enricher::enrich)
                .toList();
    }
    public long countAppointmentsWhereUserIsDoctor(Long userId) {
        return appointmentRepository.countByDoctorId(userId);
    }
}
