package com.example.TuniFinance.config;



import com.example.TuniFinance.model.TwoFactorOTP;
import com.example.TuniFinance.model.User;
import com.example.TuniFinance.repo.UserRepo;
import com.example.TuniFinance.service.EmailService;
import com.example.TuniFinance.service.JWTService;
import com.example.TuniFinance.service.TwoFactorOtpService;
import com.example.TuniFinance.utils.OtpUtils;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private TwoFactorOtpService twoFactorOtpService;

    @Autowired
    private EmailService emailService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        String email = oauthToken.getPrincipal().getAttribute("email");

        User user = userRepo.findByEmail(email);
        if (user == null) {
            user = new User();
            user.setEmail(email);
            user.setUsername(email);
            user.setProvider("GOOGLE");
            userRepo.save(user);
        }

        if (user.getTwoFactorAuth().isEnabled()) {
            String jwt = jwtService.generateToken(user.getUsername());
            String otp = OtpUtils.generateOtp();
            TwoFactorOTP oldTwoFactorOTP = twoFactorOtpService.findByUser(user.getId());
            if (oldTwoFactorOTP != null) {
                twoFactorOtpService.deleteTwoFactorOtp(oldTwoFactorOTP);
            }
            TwoFactorOTP twoFactorOTP = twoFactorOtpService.createTwoFactorOtp(user, otp, jwt);
            try {
                emailService.sendVerificationEmail(user.getEmail(), otp);
            } catch (MessagingException e) {
                // Log the error and redirect to an error page or handle gracefully
                logger.error("Failed to send 2FA email: ", e);
                String redirectUrl = "http://localhost:4200/login?error=email_failed";
                getRedirectStrategy().sendRedirect(request, response, redirectUrl);
                return;
            }
            String redirectUrl = "http://localhost:4200/verify-2fa?id=" + twoFactorOTP.getId();
            getRedirectStrategy().sendRedirect(request, response, redirectUrl);
        } else {
            String jwt = jwtService.generateToken(user.getUsername());
            String redirectUrl = "http://localhost:4200/login?token=" + jwt;
            getRedirectStrategy().sendRedirect(request, response, redirectUrl);
        }
    }
}