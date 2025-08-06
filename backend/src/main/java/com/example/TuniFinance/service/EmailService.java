package com.example.TuniFinance.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;

    @Autowired
    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendVerificationEmail(String email, String otp) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "utf-8");
        String subject = "TradeTide - Verify Your Email";
        String content = "<!DOCTYPE html>" +
                "<html lang='en'>" +
                "<head>" +
                "<meta charset='UTF-8'>" +
                "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
                "<style>" +
                "body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }" +
                ".container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }" +
                ".header { background-color: #007bff; color: #ffffff; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px; }" +
                ".header img { max-width: 150px; }" +
                ".content { padding: 30px; color: #333333; }" +
                ".otp { font-size: 24px; font-weight: bold; color: #007bff; text-align: center; margin: 20px 0; }" +
                ".footer { background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666666; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; }" +
                "a { color: #007bff; text-decoration: none; }" +
                "@media only screen and (max-width: 600px) { .content { padding: 15px; } .header { padding: 15px; } }" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class='container'>" +
                "<div class='header'>" +
                "<img src='https://github.com/ayhemnouira/dotnetProject/blob/main/image.jpg.jpg?raw=true' alt='TradeTide Logo'>" +
                "<h2>Email Verification</h2>" +
                "</div>" +
                "<div class='content'>" +
                "<p>Dear User,</p>" +
                "<p>Thank you for joining TradeTide! Please use the OTP below to verify your email address:</p>" +
                "<div class='otp'>" + otp + "</div>" +
                "<p>This OTP is valid for the next 10 minutes. If you didn’t request this, please ignore this email.</p>" +
                "<p>Best regards,<br>TradeTide Team</p>" +
                "</div>" +
                "<div class='footer'>" +
                "<p>© " + java.time.Year.now().getValue() + " TradeTide. All rights reserved.</p>" +
                "<p><a href='[Your_Website_URL]'>Visit our website</a> | <a href='[Your_Support_URL]'>Contact Support</a></p>" +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>";
        mimeMessageHelper.setSubject(subject);
        mimeMessageHelper.setText(content, true);
        mimeMessageHelper.setTo(email);
        try {
            javaMailSender.send(mimeMessage);
        } catch (Exception e) {
            e.printStackTrace();
            throw new MessagingException("Failed to send verification email");
        }
    }
}