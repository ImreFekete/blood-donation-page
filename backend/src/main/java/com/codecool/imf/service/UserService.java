package com.codecool.imf.service;

import com.codecool.imf.dto.AppointmentDTO;
import com.codecool.imf.dto.UserDTO;
import com.codecool.imf.model.Appointment;
import com.codecool.imf.model.User;
import com.codecool.imf.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AppointmentDTO getUserAppointmentByEmail(String email) {
        Optional<Appointment> appointmentOptional = userRepository.getUserAppointmentByEmail(email);
        System.out.println(appointmentOptional);
        if (appointmentOptional.isPresent()) {
            Appointment appointment = appointmentOptional.get();
            return AppointmentDTO.builder()
                    .id(appointment.getId())
                    .appointment(appointment.getLocalDateTime())
                    .build();
        }
//        TODO: exception handling
        return null;
    }
}
