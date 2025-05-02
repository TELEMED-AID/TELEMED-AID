package com.appointments.appointmentservice;

import com.appointments.appointmentservice.Entities.Appointment;
import com.appointments.appointmentservice.Repositories.MakeAppointment;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
class AppointmentServiceApplicationTests {

    //    @Test
//    void contextLoads() {
//    }
    private final MakeAppointment makeAppointment = Mockito.mock(MakeAppointment.class);

    @Test
    void testFindByIdUserID() {
        String userID = "user123";
        List<Appointment> mockAppointments = Arrays.asList(new Appointment(), new Appointment());

        when(makeAppointment.findByIdUserID(userID)).thenReturn(mockAppointments);

        List<Appointment> result = makeAppointment.findByIdUserID(userID);
        assertEquals(2, result.size());
    }

    @Test
    void testFindByIdDoctorID() {
        String doctorID = "doctor456";
        List<Appointment> mockAppointments = List.of(new Appointment());

        when(makeAppointment.findByIdDoctorID(doctorID)).thenReturn(mockAppointments);

        List<Appointment> result = makeAppointment.findByIdDoctorID(doctorID);
        assertEquals(1, result.size());
    }
}
