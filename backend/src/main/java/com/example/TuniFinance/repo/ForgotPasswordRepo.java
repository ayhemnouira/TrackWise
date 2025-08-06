package com.example.TuniFinance.repo;

import com.example.TuniFinance.model.ForgotPasswordToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForgotPasswordRepo extends JpaRepository<ForgotPasswordToken, String> {
    ForgotPasswordToken findByUserId(int userId);
}
