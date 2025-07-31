package com.smartfuel.station_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class FuelTransactionDTO {
    private Long transactionId;
    private String fuelType;
    private BigDecimal liters;
    private BigDecimal totalPrice;
    private LocalDateTime transactionTime;
}