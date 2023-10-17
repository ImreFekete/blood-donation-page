package com.codecool.imf.service;

import com.codecool.imf.dto.UserDTO;
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

    public UserDTO getUserByEmail(String email) {
        Optional<User> userOptional = userRepository.getUserByEmail(email);
        System.out.println(userOptional);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            System.out.println(user);
            return UserDTO.builder()
                    .email(user.getEmail())
                    .password(user.getPassword())

                    .build();
        }
        return null;
    }

}
