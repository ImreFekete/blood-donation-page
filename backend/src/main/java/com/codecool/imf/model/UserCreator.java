package com.codecool.imf.model;

import com.codecool.imf.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserCreator {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void initialize() {
        User ethan = User.builder()
                .name("Ethan")
                .password(passwordEncoder.encode("1234"))
                .email("ethan@citromail.com")
                .role(Role.USER)
                .build();
        userRepository.save(ethan);

        User luther = User.builder()
                .name("Luther")
                .password(passwordEncoder.encode("1234"))
                .email("luther@freemail.com")
                .role(Role.USER)
                .build();
        userRepository.save(luther);

        User benji = User.builder()
                .name("Benji")
                .password(passwordEncoder.encode("1234"))
                .email("benji@hotmail.com")
                .role(Role.USER)
                .build();
        userRepository.save(benji);
    }
}
