package com.codecool.imf.model;

import com.codecool.imf.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class AdminCreator {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void initialize() {
        User malni = User.builder()
                .name("Malni")
                .password(passwordEncoder.encode("1234"))
                .email("malni@imf.com")
                .role(Role.ADMIN)
                .build();
        userRepository.save(malni);

        User milan = User.builder()
                .name("Milan")
                .password(passwordEncoder.encode("1234"))
                .email("milan@imf.com")
                .role(Role.ADMIN)
                .build();
        userRepository.save(milan);

        User mark = User.builder()
                .name("Mark")
                .password(passwordEncoder.encode("1234"))
                .email("mark@imf.com")
                .role(Role.ADMIN)
                .build();
        userRepository.save(mark);
    }
}
