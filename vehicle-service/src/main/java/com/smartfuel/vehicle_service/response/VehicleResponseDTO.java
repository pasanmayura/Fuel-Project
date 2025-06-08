package com.smartfuel.vehicle_service.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VehicleResponseDTO {
    private String message;
    private String vehicleNumber;
    private String username;
}