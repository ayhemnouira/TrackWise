package com.example.TrackWise.repo;

import com.example.TrackWise.model.TwoFactorOTP;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TwoFactorOtpRepo extends JpaRepository<TwoFactorOTP,String> {
    TwoFactorOTP findByUserId(int userId);
}
