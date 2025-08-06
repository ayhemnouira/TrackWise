package com.example.TuniFinance.service;


import com.example.TuniFinance.model.TwoFactorOTP;
import com.example.TuniFinance.model.User;
import com.example.TuniFinance.repo.TwoFactorOtpRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class TwoFactorOtpServiceImpl implements TwoFactorOtpService {
    @Autowired
    private TwoFactorOtpRepo twoFactorOtpRepo;
    @Override
    public TwoFactorOTP createTwoFactorOtp(User user, String otp, String jwt) {
        UUID uuid = UUID.randomUUID();

        String id = uuid.toString();
        TwoFactorOTP twoFactorOTP = new TwoFactorOTP();
        twoFactorOTP.setOtp(otp);
        twoFactorOTP.setId(id);
        twoFactorOTP.setUser(user);
        twoFactorOTP.setJwt(jwt);
        return twoFactorOtpRepo.save(twoFactorOTP);
    }

    @Override
    public TwoFactorOTP findByUser(int userId) {
        return twoFactorOtpRepo.findByUserId(userId);
    }

    @Override
    public TwoFactorOTP findById(String id) {
       Optional<TwoFactorOTP> OTP = twoFactorOtpRepo.findById(id);
        return OTP.orElse(null);
    }

    @Override
    public boolean verifyTwoFactorOtp(TwoFactorOTP twoFactorOtp, String otp) {
        return twoFactorOtp.getOtp().equals(otp);
    }

    @Override
    public void deleteTwoFactorOtp(TwoFactorOTP twoFactorOtp) {
        twoFactorOtpRepo.delete(twoFactorOtp);
    }
}
