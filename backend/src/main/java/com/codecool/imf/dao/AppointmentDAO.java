package com.codecool.imf.dao;

import com.codecool.imf.dao.model.Appointment;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentDAO {

    // CREATE
    void add(LocalDateTime appointment);
    // READ
    Appointment get();
    // READ ALL
    List<Appointment> getAllForDay();
    // UPDATE
    void update();
    // DELETE
    boolean delete();
    // DELETE ALL
    boolean deleteAll();
}
