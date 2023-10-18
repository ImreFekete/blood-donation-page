package com.codecool.imf.repository;

import com.codecool.imf.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    @Query("SELECT a FROM Appointment a INNER JOIN a.user u WHERE u.id = :id")
    Optional<Appointment> findByUserId(Long id);
}
