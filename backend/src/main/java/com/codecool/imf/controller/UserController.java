package com.codecool.imf.controller;

import com.codecool.imf.dto.AppointmentDTO;
import com.codecool.imf.dto.UserDTO;
import com.codecool.imf.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable("id") Long id) {
        System.out.println("ID IN GET USER BY ID: " + id);
        return userService.getUserById(id);
    }

    @PostMapping("/login")
    public UserDTO getUserAppointmentByEmail(@RequestBody UserDTO user) {
        return userService.getUserByEmail(user.getEmail());
    }
}
