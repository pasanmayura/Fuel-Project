package com.smartfuel.vehicle_service.util;

public class FuelQuotaUtil {

    public static int getFuelQuota(String vehicleType) {
        switch (vehicleType.toLowerCase()) {
            case "car":
                return 30; 
            case "motorcycle":
                return 15; 
            case "van":
                return 40; 
            case "threewheel":
                return 20; 
            case "bus":
                return 60; 
            case "jeep":
                return 40; 
            default:
                throw new IllegalArgumentException("Invalid vehicle type: " + vehicleType);
        }
    }
}
