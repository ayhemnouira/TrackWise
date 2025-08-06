package com.example.TuniFinance.service;

import com.example.TuniFinance.domain.VerificationType;
import com.example.TuniFinance.model.VerificationCode;
import com.example.TuniFinance.model.User;

public interface VerificationCodeService {
    VerificationCode sendVerificationCode(User user, VerificationType verificationType) ;

    VerificationCode getVerificationCodeById(Long id) throws Exception;

    VerificationCode getVerificationCodeByUserId(int userId) ;


    void deleteVerificationCode(VerificationCode verificationCode) ;
}
