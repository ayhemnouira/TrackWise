package com.example.TrackWise.controller;

import com.example.TrackWise.domain.VerificationType;
import com.example.TrackWise.model.ForgotPasswordToken;
import com.example.TrackWise.model.User;
import com.example.TrackWise.model.VerificationCode;
import com.example.TrackWise.request.ForgotPasswordTokenRequest;
import com.example.TrackWise.request.ResetPasswordRequest;
import com.example.TrackWise.response.ApiResponse;
import com.example.TrackWise.response.AuthResponse;
import com.example.TrackWise.service.*;
import com.example.TrackWise.utils.OtpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private EmailService emailService;
    private String jwt;
    @Autowired
    private TwoFactorOtpService twoFactorOtpService;

    @Autowired
    private VerificationCodeService verificationCodeService;
    @Autowired
    private ForgotPasswordService forgotPasswordService;

    @GetMapping("/api/users/profile")
    public ResponseEntity<User> getUserProfile(Authentication authentication) throws Exception {
        String email = authentication.getName();
        User user = userService.findUserByEmail(email);
        return ResponseEntity.ok(user);
    }
    @PostMapping("/api/users/verification/{verificationType}/send-otp")
    public ResponseEntity<String> sendVerificationOtp(Authentication authentication,
                                                      @PathVariable VerificationType verificationType) throws Exception {
        String email = authentication.getName();
        User user = userService.findUserByEmail(email);
        VerificationCode verificationCode = verificationCodeService
                .getVerificationCodeByUserId(user.getId());
        if (verificationCode == null) {
            verificationCode = verificationCodeService.sendVerificationCode(user, verificationType);
        }
        if (verificationType.equals(VerificationType.EMAIL)){
            emailService.sendVerificationEmail(user.getEmail(), verificationCode.getOtp());
        }
        return new ResponseEntity<>("Verification otp sent successfully", HttpStatus.OK);
    }
    @PatchMapping("/api/users/enable-two-factor/verify-otp/{otp}")
    public ResponseEntity<User> enableTwoFactorAuthentication(
            @PathVariable String otp,
            Authentication authentication) throws Exception {
        String email = authentication.getName();
        User user = userService.findUserByEmail(email);
        VerificationCode verificationCode = verificationCodeService.getVerificationCodeByUserId(user.getId());
        String sendTo = verificationCode.getVerificationType().equals(VerificationType.EMAIL) ? verificationCode.getEmail() : verificationCode.getMobileNumber();
        boolean isVerified = verificationCode.getOtp().equals(otp);
        if (isVerified) {
            User updatedUser = userService.enableTwoFactorAuthentication(verificationCode.getVerificationType(), sendTo, user);
            verificationCodeService.deleteVerificationCode(verificationCode);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        }
        throw new Exception("Invalid OTP provided for enabling two-factor authentication");
    }

    @PostMapping("/auth/users/reset-password/send-otp")
    public ResponseEntity<AuthResponse> sendForgotPasswordOtp
            (@RequestBody ForgotPasswordTokenRequest req) throws Exception {
        User user = userService.findUserByEmail(req.getSendTo());
        String otp = OtpUtils.generateOtp();
        UUID uuid = UUID.randomUUID();
        String id = uuid.toString();
        ForgotPasswordToken token = forgotPasswordService.createToken(user, id, otp, req.getVerificationType(), req.getSendTo());
        if (req.getVerificationType().equals(VerificationType.EMAIL)) {
            emailService.sendVerificationEmail(user.getEmail(), token.getOtp());
        }
        AuthResponse response = new AuthResponse();
        response.setSession(token.getId());
        response.setMessage("Password reset otp sent successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/auth/users/reset-password/verify-otp")
    public ResponseEntity<ApiResponse> verifyOtpForReset(
            @RequestParam String id,
            @RequestBody ResetPasswordRequest req) throws Exception {
        ForgotPasswordToken forgotPasswordToken = forgotPasswordService.findById(id);
        if (forgotPasswordToken == null) {
            throw new Exception("Invalid or expired token");
        }
        boolean isVerified = forgotPasswordToken.getOtp().equals(req.getOtp());
        if (isVerified) {
            ApiResponse response = new ApiResponse();
            response.setMessage("OTP verified successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        throw new Exception("Invalid OTP provided for resetting password");
    }

    @PatchMapping("/auth/users/reset-password")
    public ResponseEntity<ApiResponse> resetPassword(
            @RequestParam String id,
            @RequestBody ResetPasswordRequest req) throws Exception {
        ForgotPasswordToken forgotPasswordToken = forgotPasswordService.findById(id);
        if (forgotPasswordToken == null) {
            throw new Exception("Invalid or expired token");
        }
        userService.updatePassword(forgotPasswordToken.getUser(), req.getNewPassword());
        forgotPasswordService.deleteToken(forgotPasswordToken);
        ApiResponse response = new ApiResponse();
        response.setMessage("Password reset successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


/*
    @PostMapping("/auth/users/reset-password/send-otp")
    public ResponseEntity<AuthResponse> sendForgotPasswordOtp
            (@RequestBody ForgotPasswordTokenRequest req) throws Exception {
        User user = userService.findUsereByEmail(req.getSendTo());
        String otp = OtpUtils.generateOtp();
        UUID uuid = UUID.randomUUID();
        String id = uuid.toString();
        ForgotPasswordToken token = forgotPasswordService.createToken(user, id, otp, req.getVerificationType(), req.getSendTo());
        if (req.getVerificationType().equals(VerificationType.EMAIL)) {
            emailService.sendVerificationEmail(user.getEmail(), token.getOtp());
        }
        AuthResponse response = new AuthResponse();
        response.setSession(token.getId());
        response.setMessage("Password reset otp sent successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @PatchMapping("/auth/users/reset-password/verify-otp")
    public ResponseEntity<ApiResponse> resetPassword(
            @RequestParam String id,
            @RequestBody ResetPasswordRequest req,
            Authentication authentication) throws Exception {
        String email = authentication.getName();
        User user = userService.findUsereByEmail(email);
        ForgotPasswordToken forgotPasswordToken = forgotPasswordService.findById(id);
        boolean isVerified = forgotPasswordToken.getOtp().equals(req.getOtp());
        if (isVerified) {
            userService.updatePassword(forgotPasswordToken.getUser(), req.getNewPassword());
            ApiResponse response = new ApiResponse();
            response.setMessage("Password reset successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        throw new Exception("Invalid OTP provided for resetting password");
    } */
}