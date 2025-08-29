package com.example.TrackWise.controller;



import com.example.TrackWise.model.TwoFactorOTP;
import com.example.TrackWise.model.User;
import com.example.TrackWise.response.AuthResponse;
import com.example.TrackWise.service.AuthService;
import com.example.TrackWise.service.TwoFactorOtpService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {
    @Autowired
    private AuthService authService;
    @Autowired
    private TwoFactorOtpService twoFactorOtpService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return authService.register(user); // Return the user object as a response
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) throws MessagingException {

        return authService.verify(user);
    }

    @PostMapping("/two-factor/otp/{otp}")
    public ResponseEntity<AuthResponse> verifyLoginOtp(
            @PathVariable String otp,
            @RequestParam String id) {
        try {
            TwoFactorOTP twoFactorOTP = twoFactorOtpService.findById(id);
            if (twoFactorOTP != null && twoFactorOtpService.verifyTwoFactorOtp(twoFactorOTP, otp)) {
                AuthResponse res = new AuthResponse();
                res.setMessage("Login successful");
                res.setTwoFactorEnabled(true);
                res.setJwt(twoFactorOTP.getJwt());
                return new ResponseEntity<>(res, HttpStatus.OK);
            } else {
                AuthResponse res = new AuthResponse();
                res.setMessage("Invalid OTP");
                return new ResponseEntity<>(res, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            AuthResponse res = new AuthResponse();
            res.setMessage("An error occurred");
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
