package com.codecool.imf.service;

import com.codecool.imf.dto.AppointmentDTO;
import com.codecool.imf.repository.AppointmentRepository;
import com.codecool.imf.model.Appointment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public List<AppointmentDTO> getAllAppointmentsForDay(String year, String month, String day) {
        int yearValue = Integer.parseInt(year);
        int monthValue = Integer.parseInt(month);
        int dayValue = Integer.parseInt(day);
        LocalDateTime searchedDay = LocalDateTime.of(yearValue, monthValue, dayValue, 12, 0, 0);
        System.out.println(searchedDay);

        // TODO: Fix method
        List<Appointment> appointmentDAOList = appointmentRepository.findAll();
        List<AppointmentDTO> appointmentDTOList = new ArrayList<>();
        for (Appointment appointment : appointmentDAOList) {
            LocalDateTime localDateTime = appointment.getLocalDateTime();
            if (localDateTime.getYear() == searchedDay.getYear() && localDateTime.getMonth() == searchedDay.getMonth()) {
                System.out.println("HELLO");
            }
        }

        return appointmentDTOList;
    }

    public List<AppointmentDTO> addNewAppointment(AppointmentDTO appointmentDTO) {
        // TODO: Implement normally
        appointmentRepository.save(Appointment.builder()
                .id(appointmentDTO.getId())
                .localDateTime(appointmentDTO.getAppointment())
                .build());

        String id = appointmentDTO.getAppointment().toString();
        // FIXME:
//        return getAllAppointmentsForDay(id);
        return null;
    }

    public boolean deleteAppointment(LocalDateTime id) {
        // TODO: Implement normally
        appointmentRepository.deleteById(1L);
        return true;

    }
}
