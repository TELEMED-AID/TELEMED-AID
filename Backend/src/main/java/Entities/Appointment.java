package Entities;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.*;

@Entity
@Table(name = "make_appointment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Appointment {
    @EmbeddedId
    private AppointmentID id;

    @Column(name = "appointment_state", length = 20, nullable = false)
    private AppointmentState appointmentState;
}