package com.codecool.imf.controller;

import com.codecool.imf.dto.CheckUserEmailDTO;
import com.codecool.imf.dto.NewUserDTO;
import com.codecool.imf.dto.UserDTO;
import com.codecool.imf.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @PostMapping("/register")
    public int addUser(@RequestBody NewUserDTO user) {
        userService.addUser(user);
        return HttpStatus.CREATED.value();
    }

    @PostMapping("/checkemail")
    public boolean checkEmail(@RequestBody CheckUserEmailDTO email) {
        boolean b = userService.checkEmail(email);
        System.out.println(b);
        return b;
    }

    @PatchMapping("/update/{id}")
    public boolean updateUserById(@PathVariable("id") Long id, @RequestBody UserDTO updatedUser) {
        System.out.println("CONTROLLER: " + updatedUser);
        return userService.updateUserById(id, updatedUser);
    }
}
