// src/main/java/com/example/TrackWise/service/EmailService.java
package com.example.TrackWise.service;

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
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8");
        String subject = "TrackWise - Email Verification";
        String content = "<!DOCTYPE html>" +
                "<html lang='en'>" +
                "<head>" +
                "<meta charset='UTF-8'>" +
                "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
                "<style>" +
                "body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }" +
                ".container { max-width: 600px; margin: 30px auto; background-color: #fff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }" +
                ".header { background-color: #2d7ff9; color: #fff; padding: 24px; text-align: center; border-top-left-radius: 10px; border-top-right-radius: 10px; }" +
                ".header img { max-width: 120px; margin-bottom: 10px; }" +
                ".content { padding: 32px; color: #333; }" +
                ".otp { font-size: 28px; font-weight: bold; color: #2d7ff9; text-align: center; margin: 24px 0; letter-spacing: 2px; }" +
                ".footer { background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 13px; color: #888; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; }" +
                "a { color: #2d7ff9; text-decoration: none; }" +
                "@media only screen and (max-width: 600px) { .content { padding: 16px; } .header { padding: 16px; } }" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class='container'>" +
                "<div class='header'>" +
                "<img src='https://github.com/ayhemnouira/dotnetProject/blob/main/image.jpg.jpg?raw=true' alt='TrackWise Logo'>" +
                "<h2>Welcome to TrackWise</h2>" +
                "</div>" +
                "<div class='content'>" +
                "<p>Hello,</p>" +
                "<p>Thank you for registering with <strong>TrackWise</strong>! To verify your email address, please use the OTP below:</p>" +
                "<div class='otp'>" + otp + "</div>" +
                "<p>This OTP is valid for 10 minutes. If you did not request this, please ignore this email.</p>" +
                "<p>Best regards,<br>The TrackWise Team</p>" +
                "</div>" +
                "<div class='footer'>" +
                "<p>© " + java.time.Year.now().getValue() + " TrackWise. All rights reserved.</p>" +
                "<p><a href='https://trackwise.example.com'>Visit our website</a> | <a href='mailto:support@trackwise.example.com'>Contact Support</a></p>" +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>";
        helper.setSubject(subject);
        helper.setText(content, true);
        helper.setTo(email);
        try {
            javaMailSender.send(mimeMessage);
        } catch (Exception e) {
            throw new MessagingException("Failed to send verification email", e);
        }
    }
}