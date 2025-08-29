package com.example.TrackWise.service;


import com.example.TrackWise.domain.VerificationType;
import com.example.TrackWise.model.ForgotPasswordToken;
import com.example.TrackWise.model.User;
import com.example.TrackWise.repo.ForgotPasswordRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ForgotPasswordServiceImpl implements ForgotPasswordService {

    @Autowired
    private ForgotPasswordRepo forgotPasswordRepo;

    @Override
    @Transactional
    public ForgotPasswordToken createToken(User user, String id, String otp, VerificationType verificationType, String sendTo) {
        ForgotPasswordToken token = forgotPasswordRepo.findByUserId(user.getId());
        if (token != null) {
            // Update existing token
            token.setOtp(otp);
            token.setVerificationType(verificationType);
            token.setSendTo(sendTo);
        } else {
            // Create new token
            token = new ForgotPasswordToken();
            token.setUser(user);
            token.setOtp(otp);
            token.setVerificationType(verificationType);
            token.setSendTo(sendTo);
            token.setId(id);
        }
        return forgotPasswordRepo.save(token);
    }



    @Override
    public ForgotPasswordToken findById(String id) {
        Optional<ForgotPasswordToken> token = forgotPasswordRepo.findById(id);
        return token.orElse(null);
    }

    @Override
    public ForgotPasswordToken findByUserId(int userId) {
        return forgotPasswordRepo.findByUserId(userId);
    }

    @Override
    public void deleteToken(ForgotPasswordToken token) {
        forgotPasswordRepo.delete(token);
    }

}
