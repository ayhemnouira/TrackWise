package com.example.TrackWise.service;

import com.example.TrackWise.model.User;
import com.example.TrackWise.domain.VerificationType;
import com.example.TrackWise.model.VerificationCode;
import com.example.TrackWise.repo.VerificationCodeRepo;
import com.example.TrackWise.utils.OtpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VerificationCodeServiceImpl implements VerificationCodeService{
    @Autowired
    private VerificationCodeRepo verificationCodeRepo;

    @Override
    public VerificationCode sendVerificationCode(User user, VerificationType verificationType) {
        VerificationCode VerificationCode1 = new VerificationCode();
        VerificationCode1.setOtp(OtpUtils.generateOtp());
        VerificationCode1.setVerificationType(verificationType);
        VerificationCode1.setUser(user);

        return verificationCodeRepo.save(VerificationCode1);
    }

    @Override
    public VerificationCode getVerificationCodeById(Long id) throws Exception {
        Optional<VerificationCode> verificationCode = verificationCodeRepo.findById(id);
        if (verificationCode.isPresent()) {
            return verificationCode.get();
        }
        throw new Exception("Verification code not found ");

    }

    @Override
    public VerificationCode getVerificationCodeByUserId(int userId) {
        return verificationCodeRepo.findByUserId(userId);
    }

    @Override
    public void deleteVerificationCode(VerificationCode verificationCode) {
        verificationCodeRepo.delete(verificationCode);
    }
}
