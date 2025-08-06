package com.example.TuniFinance.repo;

import com.example.TuniFinance.model.TwoFactorOTP;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TwoFactorOtpRepo extends JpaRepository<TwoFactorOTP,String> {
    TwoFactorOTP findByUserId(int userId);
}
