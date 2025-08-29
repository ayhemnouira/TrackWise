package com.example.TrackWise.service;

import com.example.TrackWise.domain.VerificationType;
import com.example.TrackWise.model.VerificationCode;
import com.example.TrackWise.model.User;

public interface VerificationCodeService {
    VerificationCode sendVerificationCode(User user, VerificationType verificationType) ;

    VerificationCode getVerificationCodeById(Long id) throws Exception;

    VerificationCode getVerificationCodeByUserId(int userId) ;


    void deleteVerificationCode(VerificationCode verificationCode) ;
}
