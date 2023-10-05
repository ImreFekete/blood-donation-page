package com.codecool.imf.controller;

import com.codecool.imf.controller.dto.AppointmentDTO;
import com.codecool.imf.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
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
        return appointmentService.getAllAppointmentsForDay(id);
    }

    @PostMapping("/allforday")
    public List<AppointmentDTO> addNewAppointment(@RequestBody LocalDateTime appointmentTimeSlot) {
        return appointmentService.addNewAppointment(new AppointmentDTO(appointmentTimeSlot));
    }

    @DeleteMapping("/{id}")
    public boolean deleteAppointment(@PathVariable LocalDateTime id) {
        return appointmentService.deleteAppointment(id);

    }
}
