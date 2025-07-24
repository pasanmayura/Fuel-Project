package com.smartfuel.station_service.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Station {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String nic;
    private String stationName;
    private String location;
    private Integer petrolCapacity;
    private Integer dieselCapacity;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;
	
}
