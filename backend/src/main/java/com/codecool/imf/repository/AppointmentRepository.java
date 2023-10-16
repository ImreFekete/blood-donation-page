package com.codecool.imf.repository;

import com.codecool.imf.controller.dto.AppointmentDTO;
import com.codecool.imf.repository.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}
