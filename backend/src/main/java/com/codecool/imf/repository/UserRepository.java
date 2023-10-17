package com.codecool.imf.repository;

import com.codecool.imf.model.Appointment;
import com.codecool.imf.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT a FROM Appointment a INNER JOIN a.user u WHERE u.email = :email")
    Optional<Appointment> getUserAppointmentByEmail(@Param("email") String email);
}
