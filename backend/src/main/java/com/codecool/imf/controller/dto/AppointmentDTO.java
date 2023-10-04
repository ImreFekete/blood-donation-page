package com.codecool.imf.controller.dto;

import java.time.LocalDateTime;

public record AppointmentDTO(LocalDateTime appointment) {

    @Override
    public String toString() {
        return "AppointmentDTO{" +
                "appointment=" + appointment +
                '}';
    }
}
