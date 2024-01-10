package com.codecool.imf.service;

import com.codecool.imf.dto.AppointmentDTO;
import com.codecool.imf.dto.CheckUserEmailDTO;
import com.codecool.imf.dto.UserDTO;
import com.codecool.imf.model.Appointment;
import com.codecool.imf.model.User;
import com.codecool.imf.repository.AppointmentRepository;
import com.codecool.imf.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class UserService {

    private final UserRepository userRepository;
    private final AppointmentRepository appointmentRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, AppointmentRepository appointmentRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.appointmentRepository = appointmentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserDTO> getAllUsers() {
        List<User> allUsers = userRepository.findAll();
        List<UserDTO> allUsersDTO = new ArrayList<>();
        for (User user : allUsers) {
            allUsersDTO.add(UserDTO.builder()
                    .name(user.getName())
                    .email(user.getEmail())
                    .role(user.getRole())
                    .build());
        }
        return allUsersDTO;
    }

    public UserDTO getUserById(Long id) {
        // TODO: Need to be refactored + exception handling
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Optional<Appointment> optionalAppointment = appointmentRepository.findByUserId(user.getId());
            if (optionalAppointment.isPresent()) {
                Appointment appointment = optionalAppointment.get();
                // IF USER HAS APPOINTMENT
                return UserDTO.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .role(user.getRole())
                        .appointmentDTO(AppointmentDTO.builder()
                                .id(appointment.getId())
                                .appointment(appointment.getLocalDateTime())
                                .build())
                        .build();
            } else {
                // IF USER DOES NOT HAVE APPOINTMENT
                return UserDTO.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .role(user.getRole())
                        .appointmentDTO(null)
                        .build();
            }
        }

        return null;
    }

    public boolean checkEmail(CheckUserEmailDTO email) {
        List<User> users = userRepository.findAll();
        return users.stream().anyMatch(user -> user.getEmail().equals(email.getEmail()));
    }

    public boolean updateUserById(Long id, UserDTO updatedUser) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setName(updatedUser.getName());
            user.setPassword(user.getPassword()); // To keep old password
            user.setEmail(updatedUser.getEmail());
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Transactional
    public boolean deleteUserById(Long id) {
        try {
            Optional<Appointment> optionalAppointment = appointmentRepository.findByUserId(id);
            if (optionalAppointment.isPresent()) {
                Appointment appointment = optionalAppointment.get();
                appointmentRepository.delete(appointment);
            }
            userRepository.deleteById(id);
            return true;
        } catch (EntityNotFoundException e) {
            log.error(e.toString());
            return false;
        }
    }
}
