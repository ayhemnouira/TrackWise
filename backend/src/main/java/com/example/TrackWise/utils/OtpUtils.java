package com.example.TrackWise.utils;

import java.util.Random;

public class OtpUtils {
    public static String generateOtp() {
        int otpLength = 6; // Length of the OTP
        Random random = new Random();
        StringBuilder otp = new StringBuilder(otpLength);
        for(int i = 0; i < otpLength; i++) {
            int digit = random.nextInt(10); // Generate a random digit between 0 and 9
            otp.append(digit);
        }
        return otp.toString();
    }



}
