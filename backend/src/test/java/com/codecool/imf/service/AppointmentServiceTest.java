package com.codecool.imf.service;

import com.codecool.imf.dto.AppointmentDTO;
import com.codecool.imf.model.Appointment;
import com.codecool.imf.repository.AppointmentRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AppointmentServiceTest {
    @Mock
    private AppointmentRepository appointmentRepository;
    @InjectMocks
    private AppointmentService appointmentService;

    @Test
    void getAllAppointmentsForDay() {
        // Arrange
        LocalDateTime searchedDay = LocalDateTime.of(2024, 2, 28, 12, 0, 0);
        List<Appointment> appointments = Arrays.asList(
                Appointment.builder().id(1L).localDateTime(searchedDay).build(),
                Appointment.builder().id(2L).localDateTime(searchedDay).build(),
                Appointment.builder().id(3L).localDateTime(searchedDay.plusDays(1)).build()
        );
        when(appointmentRepository.findAll()).thenReturn(appointments);

        // Act
        List<AppointmentDTO> result = appointmentService.getAllAppointmentsForDay("2024", "2", "28");

        // Assert
        assertEquals(2, result.size());
        assertEquals(1L, result.get(0).getId().longValue());
        assertEquals(searchedDay, result.get(0).getAppointment());
        assertEquals(2L, result.get(1).getId().longValue());
        assertEquals(searchedDay, result.get(1).getAppointment());
    }
}
