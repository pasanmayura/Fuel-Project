package com.smartfuel.vehicle_service.repository;

import com.smartfuel.vehicle_service.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    boolean existsByVehicleNumber(String vehicleNumber);
}
