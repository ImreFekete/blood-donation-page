package com.codecool.imf.repository;

import com.codecool.imf.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
