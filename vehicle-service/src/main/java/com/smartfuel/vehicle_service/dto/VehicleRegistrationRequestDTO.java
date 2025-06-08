package com.smartfuel.vehicle_service.dto;

import lombok.Data;

@Data
public class VehicleRegistrationRequestDTO {
    private VehicleDTO vehicle;
    private AccountDTO account;
}
