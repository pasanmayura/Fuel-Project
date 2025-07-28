package com.smartfuel.vehicle_service.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String nic;
    private String vehicleNumber;
    private String vehicleType;
    private String fuelType;
    private Integer fuelQuota;
    private String qrCodePath;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;    
}
