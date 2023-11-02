package com.codecool.imf.security;

import com.codecool.imf.model.Role;
import com.codecool.imf.model.User;
import com.codecool.imf.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public Boolean register(RegisterRequest request) {
        try {
            var user = User.builder()
                    .name(request.getName())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .email(request.getEmail())
                    .role(Role.USER)
                    .build();
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            log.error("Could not save user to database");
            return false;
        }
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try { // TODO: How to handle exception???
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                var jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                        .token(jwtToken)
                        .id(user.getId())
                        .build();
            } else {
                return AuthenticationResponse.builder()
                        .token(null)
                        .id(null)
                        .build();
            }
        } catch (BadCredentialsException e) {
            return AuthenticationResponse.builder()
                    .token(null)
                    .id(null)
                    .build();
        }
    }
}
