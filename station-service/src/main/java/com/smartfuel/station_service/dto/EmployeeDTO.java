package com.smartfuel.station_service.dto;

import lombok.Data;

@Data
public class EmployeeDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private Long stationId; 
    private String position;
    private String address;
    private String username;
    private String password;     
}
