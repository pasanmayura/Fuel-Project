package com.smartfuel.vehicle_service.mock;

import java.util.*;

public class MockDmtDatabase {

    // In-memory fake list of vehicle numbers
    private static final Set<String> validVehicles = new HashSet<>(Arrays.asList(
        "ABC-1234",
        "XYZ-5678",
        "QWE-9999",
        "DEF-4567",
        "CAG-1234"
    ));

    public static boolean isVehicleRegistered(String vehicleNumber) {
        return validVehicles.contains(vehicleNumber);
    }
}
