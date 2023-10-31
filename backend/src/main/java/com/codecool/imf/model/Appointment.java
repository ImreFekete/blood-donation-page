package com.codecool.imf.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @JsonIgnore // TODO: Check this annotation needed or not?
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appointment_id")
    private Long id;

    private LocalDateTime localDateTime;

    // @OneToOne(cascade = CascadeType.MERGE)
    @OneToOne(cascade = CascadeType.REMOVE) // TODO: Check this cascade needed or not?
    @JoinColumn(name = "user_id")
    private User user;

}
