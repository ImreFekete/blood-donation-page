package com.codecool.imf.controller;

import com.codecool.imf.controller.dto.AppointmentDTO;
import com.codecool.imf.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping("/allperday")
    public List<AppointmentDTO> getAllAppointmentsForDay() {
        return appointmentService.getAllAppointmentsForDay();
    }


}
