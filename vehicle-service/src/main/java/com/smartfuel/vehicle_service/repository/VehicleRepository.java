package com.smartfuel.vehicle_service.repository;

import com.smartfuel.vehicle_service.model.Account;
import com.smartfuel.vehicle_service.model.Vehicle;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    boolean existsByVehicleNumber(String vehicleNumber);
    Optional<Vehicle> findByVehicleNumber(String vehicleNumber);
    Optional<Vehicle> findByAccount(Account account);
}
