package com.codecool.imf.service;

import com.codecool.imf.controller.dto.AppointmentDTO;
import com.codecool.imf.dao.AppointmentDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentDAO appointmentDAO;

    @Autowired
    public AppointmentService(AppointmentDAO appointmentDAO) {
        this.appointmentDAO = appointmentDAO;
    }

    public List<AppointmentDTO> getAllAppointmentsForDay() {
        return null;
    }
}
