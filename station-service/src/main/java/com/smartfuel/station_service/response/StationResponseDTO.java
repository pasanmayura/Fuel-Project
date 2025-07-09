package com.smartfuel.station_service.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor

public class StationResponseDTO {
    private String message;
    private String stationName;
    private String location;
    private Integer petrolCapacity;
    private Integer dieselCapacity;
    private String username;	
}
