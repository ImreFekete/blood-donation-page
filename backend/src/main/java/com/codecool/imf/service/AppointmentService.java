package com.codecool.imf.service;

import com.codecool.imf.dto.AppointmentDTO;
import com.codecool.imf.repository.AppointmentRepository;
import com.codecool.imf.model.Appointment;
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
        // TODO: Fix method
//        List<Appointment> appointmentDAOList = appointmentRepository.getAllForDay(id);
        List<AppointmentDTO> appointmentDTOList = new ArrayList<>();

//        for (Appointment appointmentDAO : appointmentDAOList) {
//            appointmentDTOList.add(new AppointmentDTO(appointmentDAO.appointment()));
//        }

        return appointmentDTOList;
    }

    public List<AppointmentDTO> addNewAppointment(AppointmentDTO appointmentDTO) {
        // TODO: Implement normally
        appointmentRepository.save(Appointment.builder()
                .id(appointmentDTO.getId())
                .localDateTime(appointmentDTO.getAppointment())
                .build());

        String id = appointmentDTO.getAppointment().toString();
        return getAllAppointmentsForDay(id);
    }

    public boolean deleteAppointment(LocalDateTime id) {
        // TODO: Implement normally
        appointmentRepository.deleteById(1L);
        return true;

    }
}
