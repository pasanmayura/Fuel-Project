package com.smartfuel.station_service.dto;

import lombok.Data;

@Data
public class StationRegistrationDTO {
    private StationDTO station;
    private AccountDTO account;    
}
