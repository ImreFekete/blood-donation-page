package com.codecool.imf.service;

import com.codecool.imf.dto.AppointmentDTO;
import com.codecool.imf.dto.UserDTO;
import com.codecool.imf.model.Appointment;
import com.codecool.imf.model.User;
import com.codecool.imf.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDTO getUserById(Long id) {
        // TODO: Need to be refactored + exception handling
        Optional<User> optionalUser = userRepository.findById(id);
        Optional<Appointment> optionalAppointment = null;
        User user = null;
        if (optionalUser.isPresent()) {
            user = optionalUser.get();
            optionalAppointment = userRepository.getUserAppointmentByEmail(user.getEmail());
        }

        UserDTO userDTO = null;
        if (optionalAppointment.isPresent() && optionalUser.isPresent()) {
            Appointment appointment = optionalAppointment.get();
            userDTO = UserDTO.builder()
                    .email(user.getEmail())
                    .password(user.getPassword())
                    .appointmentDTO(AppointmentDTO.builder()
                            .id(appointment.getId())
                            .appointment(appointment.getLocalDateTime())
                            .build())
                    .build();
        }
        log.info("USER DTO:" + userDTO);
        return userDTO;
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
