package com.codecool.imf.service;

import com.codecool.imf.dto.AppointmentDTO;
import com.codecool.imf.dto.UserDTO;
import com.codecool.imf.model.Appointment;
import com.codecool.imf.model.User;
import com.codecool.imf.repository.AppointmentRepository;
import com.codecool.imf.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class UserService {

    private final UserRepository userRepository;
    private final AppointmentRepository appointmentRepository;

    @Autowired
    public UserService(UserRepository userRepository, AppointmentRepository appointmentRepository) {
        this.userRepository = userRepository;
        this.appointmentRepository = appointmentRepository;
    }

    public UserDTO getUserById(Long id) {
        // TODO: Need to be refactored + exception handling
        Optional<User> optionalUser = userRepository.findById(id);
        System.out.println("____________" + optionalUser.isPresent());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Optional<Appointment> optionalAppointment = appointmentRepository.findByUserId(user.getId());
            if (optionalAppointment.isPresent()) {
                Appointment appointment = optionalAppointment.get();
                return UserDTO.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .password(user.getPassword())
                        .appointmentDTO(AppointmentDTO.builder()
                                .id(appointment.getId())
                                .appointment(appointment.getLocalDateTime())
                                .build())
                        .build();
            }
        }

        return null;
    }

    public UserDTO getUserByEmail(String email) {
        Optional<User> optionalUser = userRepository.getUserByEmail(email);
        System.out.println(optionalUser);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return UserDTO.builder()
                    .id(user.getId())
                    .build();
        }
//        TODO: exception handling
        return null;
    }

//    public AppointmentDTO getUserAppointmentByEmail(String email) {
//        Optional<Appointment> appointmentOptional = userRepository.getUserAppointmentByEmail(email);
//        System.out.println(appointmentOptional);
//        if (appointmentOptional.isPresent()) {
//            Appointment appointment = appointmentOptional.get();
//            return AppointmentDTO.builder()
//                    .id(appointment.getId())
//                    .appointment(appointment.getLocalDateTime())
//                    .build();
//        }
////        TODO: exception handling
//        return null;
//    }

}
