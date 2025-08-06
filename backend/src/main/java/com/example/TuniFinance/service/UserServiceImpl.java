package com.example.TuniFinance.service;


import com.example.TuniFinance.domain.VerificationType;
import com.example.TuniFinance.model.TwoFactorAuth;
import com.example.TuniFinance.model.User;
import com.example.TuniFinance.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private JWTService jwtService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    @Override
    public User findUserByJwt(String jwt) throws Exception {
        String email = jwtService.extractEmail(jwt);
        User user = userRepo.findByEmail(email);
        if (user == null) {
            throw new Exception("user not found");
        }
        return  user;
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user = userRepo.findByEmail(email);
        if (user == null) {
            throw new Exception("user not found");
        }
        return  user;
    }

    @Override
    public User findUserById(int userId) throws Exception {
        Optional<User> user = userRepo.findById(userId);
        if (user.isEmpty()) {
            throw new Exception("User not found");
        }
        return user.get();
    }

    @Override
    public User enableTwoFactorAuthentication(VerificationType verificationType, String sendTo, User user) {
        TwoFactorAuth twoFactorAuth = new TwoFactorAuth();
        twoFactorAuth.setEnabled(true);
        twoFactorAuth.setSendTo(verificationType);
        user.setTwoFactorAuth(twoFactorAuth);

        return userRepo.save(user);
    }

    @Override
    public User updatePassword(User user, String newPassword) {
        user.setPassword(encoder.encode(newPassword));
        return userRepo.save(user);
    }
}
