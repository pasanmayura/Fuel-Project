package com.smartfuel.station_service.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.*;

@Entity
@Data
@Table(name = "fueltransactions")
public class FuelTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    private String fuelType;

    private BigDecimal liters;

    private BigDecimal totalPrice;

    private LocalDateTime transactionTime;

    @ManyToOne
    @JoinColumn(name = "station_id", nullable = false)
    private Station station;
}