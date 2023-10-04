package com.codecool.imf.dao;

import com.codecool.imf.dao.model.Appointment;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Repository
public class AppointmentDAOImpl implements AppointmentDAO {

    private final List<LocalDateTime> bookedAppointments;

    public AppointmentDAOImpl() {
        this.bookedAppointments = new ArrayList<>();
    }

    @Override
    public void add(LocalDateTime appointment) {
        bookedAppointments.add(appointment);
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
