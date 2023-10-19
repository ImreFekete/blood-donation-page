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
        return userService.checkEmail(email);
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
