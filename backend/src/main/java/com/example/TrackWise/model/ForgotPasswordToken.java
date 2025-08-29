package com.example.TrackWise.model;

import com.example.TrackWise.domain.VerificationType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Version;
import lombok.Data;

@Entity
@Data
public class ForgotPasswordToken {

    @Id
    private String id;

    @Version
    private Long version;

    @OneToOne
    private User user;

    private String otp;

    private VerificationType verificationType;

    private String sendTo;
}