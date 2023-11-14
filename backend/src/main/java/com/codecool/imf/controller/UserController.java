package com.codecool.imf.controller;

import com.codecool.imf.dto.CheckUserEmailDTO;
import com.codecool.imf.dto.UserDTO;
import com.codecool.imf.security.AuthenticationRequest;
import com.codecool.imf.security.AuthenticationResponse;
import com.codecool.imf.security.AuthenticationService;
import com.codecool.imf.security.RegisterRequest;
import com.codecool.imf.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final AuthenticationService authenticationService;

    @Autowired
    public UserController(UserService userService, AuthenticationService authenticationService) {
        this.userService = userService;
        this.authenticationService = authenticationService;
    }

    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable("id") Long id) {
        return userService.getUserById(id);
    }

    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/register")
    public ResponseEntity<HttpStatusCode> register(@RequestBody RegisterRequest request) {
        boolean isEmailReserved = userService.checkEmail(new CheckUserEmailDTO(request.getEmail()));
        if (isEmailReserved) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } else {
            boolean isRegistered = authenticationService.register(request);
            if (isRegistered) {
                return ResponseEntity.status(HttpStatus.CREATED).build();
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PatchMapping("/update/{id}")
    public boolean updateUserById(@PathVariable("id") Long id, @RequestBody UserDTO updatedUser) {
        return userService.updateUserById(id, updatedUser);
    }

    @DeleteMapping("/{id}")
    public boolean deleteUserById(@PathVariable("id") Long id) {
        return userService.deleteUserById(id);
    }
}
