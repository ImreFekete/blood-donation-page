package com.codecool.imf.controller;

import com.codecool.imf.controller.dto.AppointmentDTO;
import com.codecool.imf.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/allforday/{id}")
    public List<AppointmentDTO> getAllAppointmentsForDay(@PathVariable String id) {
        System.out.println(id);
        List<AppointmentDTO> allAppointmentsForDay = appointmentService.getAllAppointmentsForDay(id);
        System.out.println("APPS: " + allAppointmentsForDay);
        return allAppointmentsForDay;
    }

}
