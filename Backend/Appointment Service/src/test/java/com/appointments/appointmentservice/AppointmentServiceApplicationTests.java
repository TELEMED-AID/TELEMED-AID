package com.appointments.appointmentservice;

import com.appointments.appointmentservice.Config.AppointmentEnrichmentFlowConfig;
import com.appointments.appointmentservice.Config.DoctorServiceClient;
import com.appointments.appointmentservice.DTOs.AppointmentResponseDTO;
import com.appointments.appointmentservice.DTOs.DoctorDataDTO;
import com.appointments.appointmentservice.Entities.Appointment;
import com.appointments.appointmentservice.Entities.AppointmentID;
import com.appointments.appointmentservice.Entities.AppointmentState;
import com.appointments.appointmentservice.Repositories.MakeAppointment;
import com.appointments.appointmentservice.Service.AppointmentCleanup;
import com.appointments.appointmentservice.Service.AppointmentQueryService;
import com.appointments.appointmentservice.Service.BookAppointment;
import com.appointments.appointmentservice.Service.CancelAppointment;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class AppointmentServiceApplicationTests {

    private final String userId = "user123";
    private final Long doctorId = 456L;
    private final LocalDate futureDate = LocalDate.now().plusDays(1);
    private final LocalTime appointmentTime = LocalTime.of(10, 0);

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindAppointmentsByUserId() {
        MakeAppointment makeAppointment = mock(MakeAppointment.class);
        when(makeAppointment.findByIdUserID(userId)).thenReturn(List.of(new Appointment(), new Appointment()));

        List<Appointment> result = makeAppointment.findByIdUserID(userId);
        assertEquals(2, result.size());
    }

    @Test
    void testFindAppointmentsByDoctorId() {
        MakeAppointment makeAppointment = mock(MakeAppointment.class);
        when(makeAppointment.findByIdDoctorID(doctorId)).thenReturn(List.of(new Appointment()));

        List<Appointment> result = makeAppointment.findByIdDoctorID(doctorId);
        assertEquals(1, result.size());
    }

    /// TC-APP-1: Valid Appointment Booking
    @Test
    void shouldBookValidAppointment() {
        MakeAppointment makeAppointment = mock(MakeAppointment.class);
        BookAppointment bookAppointment = new BookAppointment(makeAppointment);
        when(makeAppointment.existsById(any())).thenReturn(false);
        boolean result = bookAppointment.bookAppointment(userId, doctorId, LocalDate.now(), LocalTime.now().plusHours(1));
        assertTrue(result);
        verify(makeAppointment).save(any(Appointment.class));
    }

    /// TC-APP-2: Booking with Null Parameters
    @Test
    void shouldFailBookingWhenParamsAreNull() {
        MakeAppointment repo = mock(MakeAppointment.class);
        BookAppointment booker = new BookAppointment(repo);

        assertFalse(booker.bookAppointment(null, doctorId, futureDate, appointmentTime));
        assertFalse(booker.bookAppointment(userId, null, futureDate, appointmentTime));
        assertFalse(booker.bookAppointment(userId, doctorId, null, appointmentTime));
        assertFalse(booker.bookAppointment(userId, doctorId, futureDate, null));
    }

    /// TC-APP-3: Booking in the Past
    @Test
    void shouldNotBookInPast() {
        MakeAppointment repo = mock(MakeAppointment.class);
        BookAppointment booker = new BookAppointment(repo);

        assertFalse(booker.bookAppointment(userId, doctorId, LocalDate.now().minusDays(1), appointmentTime));
        assertFalse(booker.bookAppointment(userId, doctorId, LocalDate.now(), LocalTime.now().minusHours(1)));
        verify(repo, never()).save(any());
    }

    /// TC-APP-4: Duplicate Appointment Booking
    @Test
    void shouldNotBookDuplicateAppointment() {
        MakeAppointment repo = mock(MakeAppointment.class);
        BookAppointment booker = new BookAppointment(repo);
        when(repo.existsById(any())).thenReturn(true);

        boolean result = booker.bookAppointment(userId, doctorId, futureDate, appointmentTime);
        assertFalse(result);
        verify(repo).existsById(any());
    }

    /// TC-APP-5: Exception During Booking
    @Test
    void shouldHandleExceptionDuringBooking() {
        MakeAppointment repo = mock(MakeAppointment.class);
        BookAppointment booker = new BookAppointment(repo);
        when(repo.existsById(any())).thenReturn(false);
        doThrow(new RuntimeException("DB error")).when(repo).save(any());

        boolean result = booker.bookAppointment(userId, doctorId, futureDate, appointmentTime);
        assertFalse(result);
        verify(repo).save(any());
    }

    /// TC-APP-6: Valid Appointment Cancellation
    @Test
    void shouldCancelValidAppointment() {
        MakeAppointment repo = mock(MakeAppointment.class);
        CancelAppointment canceler = new CancelAppointment(repo);
        doNothing().when(repo).deleteById(any());

        boolean result = canceler.cancelAppointment(userId, doctorId, futureDate, appointmentTime);
        assertTrue(result);
        verify(repo).deleteById(any());
    }

    /// TC-APP-7: Retrieve Appointments for Patient
    @Test
    void shouldRetrieveAppointmentsForPatient() {
        AppointmentID id = new AppointmentID(userId, doctorId, LocalDate.now(), appointmentTime);
        Appointment appt = Appointment.builder().id(id).appointmentState(AppointmentState.PENDING).build();
        AppointmentResponseDTO enrichedDto = AppointmentResponseDTO.builder()
                .userId(userId)
                .doctorDetails(DoctorDataDTO.builder().name("Dr. John Doe").specialization("Cardiology").build())
                .date(id.getAppointmentDate())
                .time(id.getAppointmentTime())
                .state(AppointmentState.PENDING)
                .build();

        MakeAppointment repo = mock(MakeAppointment.class);
        AppointmentEnrichmentFlowConfig.AppointmentEnrichmentGateway enricher = mock(AppointmentEnrichmentFlowConfig.AppointmentEnrichmentGateway.class);

        when(repo.findByIdUserID(userId)).thenReturn(List.of(appt));
        when(enricher.enrich(appt)).thenReturn(enrichedDto);

        AppointmentQueryService queryService = new AppointmentQueryService(repo, enricher);
        List<AppointmentResponseDTO> result = queryService.getAppointmentsForUser(userId, null);

        assertEquals(1, result.size());
        assertEquals(userId, result.get(0).getUserId());
        assertEquals("Dr. John Doe", result.get(0).getDoctorDetails().getName());
    }

    @Test
    void testGetAppointmentsForPatient_WithDoctorIdFilter() {
        MakeAppointment appointmentRepository = mock(MakeAppointment.class);
        Appointment appointment = mock(Appointment.class);
        AppointmentID appointmentID = new AppointmentID(userId, doctorId, futureDate, appointmentTime);
        DoctorDataDTO doctorDataDTO = DoctorDataDTO.builder().name("Dr. John Doe").specialization("Cardiology").build();
        Long doctorIdFilter = 456L;

        AppointmentEnrichmentFlowConfig.AppointmentEnrichmentGateway enricher = mock(AppointmentEnrichmentFlowConfig.AppointmentEnrichmentGateway.class);
        AppointmentResponseDTO enrichedDto = AppointmentResponseDTO.builder()
                .userId(userId)
                .doctorDetails(doctorDataDTO)
                .date(futureDate)
                .time(appointmentTime)
                .state(AppointmentState.PENDING)
                .build();

        when(appointmentRepository.findByIdUserIDAndIdDoctorID(userId, doctorIdFilter))
                .thenReturn(List.of(appointment));
        when(appointment.getId()).thenReturn(appointmentID);
        when(appointment.getAppointmentState()).thenReturn(AppointmentState.PENDING);
        when(enricher.enrich(appointment)).thenReturn(enrichedDto);

        AppointmentQueryService appointmentQueryService = new AppointmentQueryService(appointmentRepository, enricher);

        List<AppointmentResponseDTO> result = appointmentQueryService.getAppointmentsForUser(userId, doctorIdFilter);

        verify(appointmentRepository, times(1))
                .findByIdUserIDAndIdDoctorID(userId, doctorIdFilter);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(userId, result.get(0).getUserId());
        assertEquals("Dr. John Doe", result.get(0).getDoctorDetails().getName());
        assertEquals("Cardiology", result.get(0).getDoctorDetails().getSpecialization());
        assertEquals(futureDate, result.get(0).getDate());
        assertEquals(appointmentTime, result.get(0).getTime());
        assertEquals(AppointmentState.PENDING, result.get(0).getState());
    }

    @Test
    void cancelAppointment_NullParameters_ShouldReturnFalse() {
        MakeAppointment mockRepository = mock(MakeAppointment.class);
        CancelAppointment cancelAppointment = new CancelAppointment(mockRepository);

        assertFalse(cancelAppointment.cancelAppointment(null, 1L, LocalDate.now(), LocalTime.now()));
        assertFalse(cancelAppointment.cancelAppointment("user123", null, LocalDate.now(), LocalTime.now()));
        assertFalse(cancelAppointment.cancelAppointment("user123", 1L, null, LocalTime.now()));
        assertFalse(cancelAppointment.cancelAppointment("user123", 1L, LocalDate.now(), null));

        verifyNoInteractions(mockRepository);
    }

    @Test
    void cancelAppointment_RepositoryThrowsException_ShouldReturnFalse() {
        MakeAppointment mockRepository = mock(MakeAppointment.class);
        CancelAppointment cancelAppointment = new CancelAppointment(mockRepository);

        doThrow(new RuntimeException("DB error"))
                .when(mockRepository)
                .deleteById(any(AppointmentID.class));

        boolean result = cancelAppointment.cancelAppointment("user123", 1L, LocalDate.now(), LocalTime.now());

        assertFalse(result);
        verify(mockRepository, times(1)).deleteById(any(AppointmentID.class));
    }

    @Autowired
    private AppointmentCleanup appointmentCleanup;

    @MockitoBean
    private MakeAppointment makeAppointment;

    @Test
    void shouldUpdateOldAppointmentsToCompleted() {
        doNothing().when(makeAppointment).updateAppointmentStateByDateBefore(
                AppointmentState.PENDING, AppointmentState.COMPLETED, LocalDate.now());

        appointmentCleanup.updateAppointmentsToCompleted();

        verify(makeAppointment).updateAppointmentStateByDateBefore(
                AppointmentState.PENDING, AppointmentState.COMPLETED, LocalDate.now());
    }

    @Test
    void testUpdateAppointmentsToCompleted_ExceptionHandling() {
        doThrow(new RuntimeException("Database error")).when(makeAppointment)
                .updateAppointmentStateByDateBefore(AppointmentState.PENDING, AppointmentState.COMPLETED, LocalDate.now());

        appointmentCleanup.updateAppointmentsToCompleted();

        verify(makeAppointment, times(1)).updateAppointmentStateByDateBefore(
                AppointmentState.PENDING, AppointmentState.COMPLETED, LocalDate.now());
    }
}
