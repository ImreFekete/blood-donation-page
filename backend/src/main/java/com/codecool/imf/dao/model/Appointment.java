package com.codecool.imf.dao.model;

import java.time.LocalDateTime;

public record Appointment(LocalDateTime appointment) {

    @Override
    public String toString() {
        return "Appointment{" +
                "appointment=" + appointment +
                '}';
    }
}
