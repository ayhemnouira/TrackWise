package com.example.TrackWise.repo;

import com.example.TrackWise.model.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationCodeRepo extends JpaRepository<VerificationCode,Long> {
    VerificationCode findByUserId(int userId);
}
