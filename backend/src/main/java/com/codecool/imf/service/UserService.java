package com.codecool.imf.service;

import com.codecool.imf.dto.AppointmentDTO;
import com.codecool.imf.dto.CheckUserEmailDTO;
import com.codecool.imf.dto.NewUserDTO;
import com.codecool.imf.dto.UserDTO;
import com.codecool.imf.model.Appointment;
import com.codecool.imf.model.User;
import com.codecool.imf.repository.AppointmentRepository;
import com.codecool.imf.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import javax.swing.text.html.Option;
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
                // IF USER HAS APPOINTMENT
                return UserDTO.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .password(user.getPassword())
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
                        .password(user.getPassword())
                        .appointmentDTO(null)
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
//      TODO: exception handling
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

    public void addUser(NewUserDTO user) {
        User newUser = User.builder()
                .name(user.getName())
                .password(user.getPassword())
                .email(user.getEmail())
                .build();
        userRepository.save(newUser);
    }

    public boolean checkEmail(CheckUserEmailDTO email) {
        List<User> users = userRepository.findAll();
        return users.stream().anyMatch(user -> user.getEmail().equals(email.getEmail()));
    }

    public boolean updateUserById(Long id, UserDTO updatedUser) {
        Optional<User> optionalUser = userRepository.findById(id);
        System.out.println("SERVICE OPTIONAL USER: " + optionalUser);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setName(updatedUser.getName());
            user.setPassword(updatedUser.getPassword());
            user.setEmail(updatedUser.getEmail());
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public boolean deleteUserById(Long id) {
        try {
            Optional<Appointment> optionalAppointment = appointmentRepository.findByUserId(id);
            if (optionalAppointment.isPresent()) {
                Appointment appointment = optionalAppointment.get();
                System.out.println("SERVICE APPOINTMENT DELETE: " + appointment);
                appointmentRepository.delete(appointment);
            }
            userRepository.deleteById(id);
            System.out.println("TRUE");
            return true;
        } catch (EntityNotFoundException e) {
            log.error(e.toString());
            return false;
        }
    }
}
