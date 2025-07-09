package com.smartfuel.station_service.dto;

import lombok.Data;

@Data
public class StationDTO {
    private String firstName;
    private String lastName;
    private String nic;
    private String stationName;
    private String location;
    private Integer petrolCapacity;
    private Integer dieselCapacity;    
}
