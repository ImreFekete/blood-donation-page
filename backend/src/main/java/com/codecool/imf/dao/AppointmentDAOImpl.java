package com.codecool.imf.dao;

import com.codecool.imf.controller.dto.AppointmentDTO;
import com.codecool.imf.dao.model.Appointment;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

@Repository
public class AppointmentDAOImpl implements AppointmentDAO {

    private final List<LocalDateTime> bookedAppointmentsLocalDates;

    public AppointmentDAOImpl() {
        bookedAppointmentsLocalDates = new ArrayList<>();
        bookedAppointmentsLocalDates.add(LocalDateTime.of(2023, Month.OCTOBER, 5, 9, 0));
        // LocalDateTime.of(2023, Month.OCTOBER, 5, 9, 30),
        // LocalDateTime.of(2023, Month.OCTOBER, 5, 10, 0),
        bookedAppointmentsLocalDates.add(LocalDateTime.of(2023, Month.OCTOBER, 5, 10, 30));
        bookedAppointmentsLocalDates.add(LocalDateTime.of(2023, Month.OCTOBER, 5, 11, 30));
        // LocalDateTime.of(2023, Month.OCTOBER, 5, 12, 0),
        // LocalDateTime.of(2023, Month.OCTOBER, 5, 13, 0),
        // LocalDateTime.of(2023, Month.OCTOBER, 5, 13, 30),
        //  LocalDateTime.of(2023, Month.OCTOBER, 5, 14, 30),
        //  LocalDateTime.of(2023, Month.OCTOBER, 5, 15, 0),
        bookedAppointmentsLocalDates.add(LocalDateTime.of(2023, Month.OCTOBER, 5, 15, 30));
        bookedAppointmentsLocalDates.add(LocalDateTime.of(2023, Month.OCTOBER, 5, 16, 0));
        //  LocalDateTime.of(2023, Month.OCTOBER, 5, 16, 30),
        //  LocalDateTime.of(2023, Month.OCTOBER, 5, 17, 0)
    }

    @Override
    public void add(AppointmentDTO appointment) {
        bookedAppointmentsLocalDates.add(appointment.appointment());
    }

    @Override
    public Appointment get() {
        return null;
    }

    @Override
    public List<Appointment> getAllForDay(String id) {
        List<Appointment> bookedAppointments = new ArrayList<>();

        for (LocalDateTime bookedAppointmentsLocalDate : bookedAppointmentsLocalDates) {
            bookedAppointments.add(new Appointment(bookedAppointmentsLocalDate));
        }

        return bookedAppointments;
    }

    @Override
    public void update() {

    }

    @Override
    public boolean delete(LocalDateTime appointmentDTO) {
        return bookedAppointmentsLocalDates.removeIf(appointmentDTO::isEqual);
    }

    @Override
    public boolean deleteAll() {
        return false;
    }
}
