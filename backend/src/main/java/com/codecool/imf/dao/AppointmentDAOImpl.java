package com.codecool.imf.dao;

import com.codecool.imf.dao.model.Appointment;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class AppointmentDAOImpl implements AppointmentDAO {

    private final List<LocalDateTime> appointments;

    public AppointmentDAOImpl() {
        this.appointments = new ArrayList<>();
    }

    @Override
    public void add(LocalDateTime appointment) {
        appointments.add(appointment);
    }

    @Override
    public Appointment get() {
        return null;
    }

    @Override
    public List<Appointment> getAllForDay() {
        return null;
    }

    @Override
    public void update() {

    }

    @Override
    public boolean delete() {
        return false;
    }

    @Override
    public boolean deleteAll() {
        return false;
    }
}
