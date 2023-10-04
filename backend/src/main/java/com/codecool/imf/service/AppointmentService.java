package com.codecool.imf.service;

import com.codecool.imf.controller.dto.AppointmentDTO;
import com.codecool.imf.dao.AppointmentDAO;
import com.codecool.imf.dao.model.Appointment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentDAO appointmentDAO;

    @Autowired
    public AppointmentService(AppointmentDAO appointmentDAO) {
        this.appointmentDAO = appointmentDAO;
    }

    public List<AppointmentDTO> getAllAppointmentsForDay() {
        List<Appointment> appointmentDAOList = appointmentDAO.getAllForDay();
        List<AppointmentDTO> appointmentDTOList = new ArrayList<>();

        for (Appointment appointmentDAO : appointmentDAOList) {
            appointmentDTOList.add(new AppointmentDTO(appointmentDAO.appointment()));
        }

        return appointmentDTOList;
    }
}
