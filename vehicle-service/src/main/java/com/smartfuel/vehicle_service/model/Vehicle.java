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

    private String ownerName;
    private String nic;
    private String vehicleNumber;
    private String vehicleType;
    private String fuelType;
    private String qrCode;
    
}
