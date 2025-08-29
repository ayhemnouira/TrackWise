package com.example.TrackWise.repo;

import com.example.TrackWise.model.ForgotPasswordToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForgotPasswordRepo extends JpaRepository<ForgotPasswordToken, String> {
    ForgotPasswordToken findByUserId(int userId);
}
