package com.example.TrackWise.service;


import com.example.TrackWise.domain.VerificationType;
import com.example.TrackWise.model.User;

public interface UserService {
    public User findUserByJwt(String jwt) throws Exception;
    public User findUserByEmail(String email) throws Exception;
        public User findUserById(int userId) throws Exception;
    public User enableTwoFactorAuthentication(VerificationType verificationType,
                                              String sendTo, User user);
    public User updatePassword(User user, String newPassword);


}
