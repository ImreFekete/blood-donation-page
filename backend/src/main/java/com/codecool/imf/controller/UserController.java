package com.codecool.imf.controller;


import com.codecool.imf.dto.UserDTO;
import com.codecool.imf.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{email}/")
    public UserDTO getUserByEmail(@PathVariable String email) {
        System.out.println(email);
        return userService.getUserByEmail(email);
    }
}
