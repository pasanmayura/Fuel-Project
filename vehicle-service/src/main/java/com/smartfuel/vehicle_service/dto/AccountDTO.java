package com.smartfuel.vehicle_service.dto;

import lombok.Data;

@Data
public class AccountDTO {
    private String username;
    private String password; // Plain text password from the request
    private String email;
    private String role = "VehicleOwner"; 
}
