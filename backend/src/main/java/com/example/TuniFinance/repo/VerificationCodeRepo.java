package com.example.TuniFinance.repo;

import com.example.TuniFinance.model.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationCodeRepo extends JpaRepository<VerificationCode,Long> {
    VerificationCode findByUserId(int userId);
}
