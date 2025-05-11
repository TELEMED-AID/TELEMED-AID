package com.appointments.appointmentservice;

import com.appointments.appointmentservice.Entities.Appointment;
import com.appointments.appointmentservice.Entities.AppointmentState;
import com.appointments.appointmentservice.Repositories.MakeAppointment;
import com.appointments.appointmentservice.Service.AppointmentCleanup;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

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
        Long doctorID = 456L;
        List<Appointment> mockAppointments = List.of(new Appointment());

        when(makeAppointment.findByIdDoctorID(doctorID)).thenReturn(mockAppointments);

        List<Appointment> result = makeAppointment.findByIdDoctorID(doctorID);
        assertEquals(1, result.size());
    }
    @Autowired
    private AppointmentCleanup appointmentCleanup;
    @MockitoBean
    private MakeAppointment makeAppointment2;
    @Test
    public void testUpdateAppointmentsToCompleted() {


        // Mock repository behavior
        doNothing().when(makeAppointment2).updateAppointmentStateByDateBefore(
                AppointmentState.PENDING, AppointmentState.COMPLETED, LocalDate.now());

        // Call the scheduled method
        appointmentCleanup.updateAppointmentsToCompleted();

        // Verify the repository method was called
        verify(makeAppointment2, times(1)).updateAppointmentStateByDateBefore(
                AppointmentState.PENDING, AppointmentState.COMPLETED, LocalDate.now());
    }
}
