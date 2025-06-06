package com.smartfuel.vehicle_service.repository.controller;

import com.smartfuel.vehicle_service.model.Vehicle;
import com.smartfuel.vehicle_service.repository.VehicleRepository;
import com.smartfuel.vehicle_service.mock.MockDmtDatabase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vehicles")

public class VehicleController {

    @Autowired
    private VehicleRepository vehicleRepository;

    @PostMapping("/register")
    public Vehicle registerVehicle(@RequestBody Vehicle vehicle) {

        if (!MockDmtDatabase.isVehicleRegistered(vehicle.getVehicleNumber())) {
            throw new RuntimeException("Vehicle not registered in Department of Motor Traffic (DMT)");
        }
        
        if (vehicleRepository.existsByVehicleNumber(vehicle.getVehicleNumber())) {
            throw new IllegalArgumentException("Vehicle with this number already exists");
        }
        //just for now
        vehicle.setQrCode("QR-" + vehicle.getVehicleNumber());

        return vehicleRepository.save(vehicle);
    }    
}
