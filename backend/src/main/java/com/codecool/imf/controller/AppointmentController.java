package com.codecool.imf.controller;

import com.codecool.imf.dto.AppointmentDTO;
import com.codecool.imf.dto.NewAppointmentDTO;
import com.codecool.imf.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }


    @GetMapping("/allforday")
    public List<AppointmentDTO> getAllAppointmentsForDay(
            @RequestParam String year,
            @RequestParam String month,
            @RequestParam String day
    ) {
        return appointmentService.getAllAppointmentsForDay(year, month, day);
    }

    // IT CREATES NEW APPOINTMENT
    @PostMapping("/create")
    public Boolean addNewAppointment(@RequestBody NewAppointmentDTO appointmentTimeSlot) {
        return appointmentService.addNewAppointment(appointmentTimeSlot);
    }

    @DeleteMapping("/{appointmentId}")
    public boolean deleteAppointment(@PathVariable Long appointmentId) {
        return appointmentService.deleteAppointment(appointmentId);
    }
}
