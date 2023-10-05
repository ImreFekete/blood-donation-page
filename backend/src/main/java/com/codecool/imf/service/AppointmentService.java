package com.codecool.imf.service;

import com.codecool.imf.controller.dto.AppointmentDTO;
import com.codecool.imf.dao.AppointmentDAO;
import com.codecool.imf.dao.model.Appointment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentDAO appointmentDAO;

    @Autowired
    public AppointmentService(AppointmentDAO appointmentDAO) {
        this.appointmentDAO = appointmentDAO;
    }

    public List<AppointmentDTO> getAllAppointmentsForDay(String id) {
        List<Appointment> appointmentDAOList = appointmentDAO.getAllForDay(id);
        List<AppointmentDTO> appointmentDTOList = new ArrayList<>();

        for (Appointment appointmentDAO : appointmentDAOList) {
            appointmentDTOList.add(new AppointmentDTO(appointmentDAO.appointment()));
        }

        return appointmentDTOList;
    }

    public List<AppointmentDTO> addNewAppointment(AppointmentDTO appointmentDTO) {
        appointmentDAO.add(appointmentDTO);
        String id = appointmentDTO.appointment().toString();

        return getAllAppointmentsForDay(id);
    }

    public boolean deleteAppointment(LocalDateTime id) {
        return appointmentDAO.delete(id);
    }
}
