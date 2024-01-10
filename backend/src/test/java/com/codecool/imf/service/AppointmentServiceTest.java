package com.codecool.imf.service;

import com.codecool.imf.model.Appointment;
import com.codecool.imf.repository.AppointmentRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@ExtendWith(MockitoExtension.class)
class AppointmentServiceTest {

    private final List<Appointment> bookedAppointments = new ArrayList<>();
    private final List<LocalDateTime> bookedAppointmentsLocalDates = new ArrayList<>();
    @Mock
    private AppointmentRepository mockAppointmentRepository;
    private AppointmentService appointmentService;

    // FIXME: new repository was given, this test is out dated
//    @BeforeEach
//    void setUp() {
//        appointmentService = new AppointmentService(mockAppointmentRepository, userRepository);
//
//        bookedAppointmentsLocalDates.add(LocalDateTime.of(2023, Month.OCTOBER, 6, 9, 0));
//        bookedAppointmentsLocalDates.add(LocalDateTime.of(2023, Month.OCTOBER, 6, 10, 30));
//        bookedAppointmentsLocalDates.add(LocalDateTime.of(2023, Month.OCTOBER, 6, 11, 30));
//        bookedAppointmentsLocalDates.add(LocalDateTime.of(2023, Month.OCTOBER, 6, 15, 30));
//        bookedAppointmentsLocalDates.add(LocalDateTime.of(2023, Month.OCTOBER, 6, 16, 0));
//
//        for (LocalDateTime bookedAppointmentsLocalDate : bookedAppointmentsLocalDates) {
//            bookedAppointments.add(new Appointment(bookedAppointmentsLocalDate));
//        }
//    }

//    @Test
//    void getAllAppointmentsForDay() {
//        // ARRANGE
//        String test = "test";
//        when(mockAppointmentRepository.getAllForDay(test)).thenReturn(bookedAppointments);
//        // ACT
//        List<AppointmentDTO> result = appointmentService.getAllAppointmentsForDay(test);
//        int expected = bookedAppointments.size();
//        // ASSERT
//        assertNotNull(result);
//        assertEquals(expected, result.size());
//    }

    @Test
    void addNewAppointment() {
    }

    @Test
    void deleteAppointment() {
    }
}
