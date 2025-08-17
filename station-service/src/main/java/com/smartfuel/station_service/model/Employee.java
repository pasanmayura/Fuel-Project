package com.smartfuel.station_service.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String stationName;
    private String position;
    private String address;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;
    
}
