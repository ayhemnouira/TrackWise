package com.example.TrackWise.model;
import com.example.TrackWise.domain.VerificationType;
import lombok.Data;


@Data
public class TwoFactorAuth {
    private boolean isEnabled = false;
    private VerificationType sendTo;
}
