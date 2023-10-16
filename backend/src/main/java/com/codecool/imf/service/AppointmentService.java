package com.codecool.imf.service;

import com.codecool.imf.controller.dto.AppointmentDTO;
import com.codecool.imf.repository.AppointmentRepository;
import com.codecool.imf.repository.model.Appointment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public List<AppointmentDTO> getAllAppointmentsForDay(String id) {
        List<Appointment> appointmentDAOList = appointmentRepository.getAllForDay(id);
        List<AppointmentDTO> appointmentDTOList = new ArrayList<>();

        for (Appointment appointmentDAO : appointmentDAOList) {
            appointmentDTOList.add(new AppointmentDTO(appointmentDAO.appointment()));
        }

        return appointmentDTOList;
    }

    public List<AppointmentDTO> addNewAppointment(AppointmentDTO appointmentDTO) {
        appointmentRepository.add(appointmentDTO);
        String id = appointmentDTO.appointment().toString();

        return getAllAppointmentsForDay(id);
    }

    public boolean deleteAppointment(LocalDateTime id) {
        return appointmentRepository.delete(id);
    }
}
