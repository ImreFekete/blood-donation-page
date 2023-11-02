package com.codecool.imf.service;

import com.codecool.imf.dto.AppointmentDTO;
import com.codecool.imf.dto.NewAppointmentDTO;
import com.codecool.imf.model.Appointment;
import com.codecool.imf.model.User;
import com.codecool.imf.repository.AppointmentRepository;
import com.codecool.imf.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository, UserRepository userRepository) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
    }

    public List<AppointmentDTO> getAllAppointmentsForDay(String year, String month, String day) {
        int yearValue = Integer.parseInt(year);
        int monthValue = Integer.parseInt(month);
        int dayValue = Integer.parseInt(day);
        LocalDateTime searchedDay = LocalDateTime.of(yearValue, monthValue, dayValue, 12, 0, 0);

        List<Appointment> appointmentDAOList = appointmentRepository.findAll();
        List<AppointmentDTO> appointmentDTOList = new ArrayList<>();

        for (Appointment appointment : appointmentDAOList) {
            LocalDateTime localDateTime = appointment.getLocalDateTime();
            if (localDateTime.getYear() == searchedDay.getYear() &&
                    localDateTime.getMonth() == searchedDay.getMonth() &&
                    localDateTime.getDayOfMonth() == searchedDay.getDayOfMonth()) {
                appointmentDTOList.add(AppointmentDTO.builder()
                        .id(appointment.getId())
                        .appointment(appointment.getLocalDateTime())
                        .build());
            }
        }

        return appointmentDTOList;
    }

    public Boolean addNewAppointment(NewAppointmentDTO newAppointmentDTO) {
        Optional<User> optionalUser = userRepository.findById(newAppointmentDTO.getUserId());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Appointment appointment = Appointment.builder()
                    .user(user)
                    .localDateTime(newAppointmentDTO.getAppointment())
                    .build();
            appointmentRepository.save(appointment);
            return true;
        }
        return false;
    }

    public boolean deleteAppointment(Long id) {
        try {
            appointmentRepository.deleteById(id);
            return true;
        } catch (DataAccessException e) {
            return false;
        }
    }
}
