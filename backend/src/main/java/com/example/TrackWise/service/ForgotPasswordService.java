package com.example.TrackWise.service;


import com.example.TrackWise.domain.VerificationType;
import com.example.TrackWise.model.ForgotPasswordToken;
import com.example.TrackWise.model.User;

public interface ForgotPasswordService {
    ForgotPasswordToken createToken(User user,
                                    String id, String otp,
                                    VerificationType verificationType,
                                    String sendTo);
    ForgotPasswordToken findById(String id);
    ForgotPasswordToken findByUserId(int userId);
    void deleteToken(ForgotPasswordToken token);
}
