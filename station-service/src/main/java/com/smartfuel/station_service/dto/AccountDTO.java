package com.smartfuel.station_service.dto;

import lombok.Data;

@Data
public class AccountDTO {
    private String username;
    private String password; 
    private String email;
    private String role = "StationOwner"; 
}
