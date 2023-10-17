package com.codecool.imf.controller;

import com.codecool.imf.dto.UserDTO;
import com.codecool.imf.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public UserDTO getUserByEmail(@RequestBody UserDTO user) {
        System.out.println(user);
        return null;
    }
}
