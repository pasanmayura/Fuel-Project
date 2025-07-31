package com.smartfuel.station_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DailyRevenueDTO {
    private String transactionDate; // Date in "yyyy-MM-dd" format
    private String fuelType;        // Fuel type (Petrol/Diesel)
    private Double totalRevenue;    // Total revenue for the day
}