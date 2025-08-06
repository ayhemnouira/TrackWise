package com.example.TuniFinance.service;


import com.example.TuniFinance.domain.VerificationType;
import com.example.TuniFinance.model.ForgotPasswordToken;
import com.example.TuniFinance.model.User;

public interface ForgotPasswordService {
    ForgotPasswordToken createToken(User user,
                                    String id, String otp,
                                    VerificationType verificationType,
                                    String sendTo);
    ForgotPasswordToken findById(String id);
    ForgotPasswordToken findByUserId(int userId);
    void deleteToken(ForgotPasswordToken token);
}
