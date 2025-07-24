package com.smartfuel.vehicle_service.controller;

import com.smartfuel.vehicle_service.dto.LoginRequestDTO;
import com.smartfuel.vehicle_service.dto.VehicleRegistrationRequestDTO;
import com.smartfuel.vehicle_service.model.Account;
import com.smartfuel.vehicle_service.model.Vehicle;
import com.smartfuel.vehicle_service.repository.AccountRepository;
import com.smartfuel.vehicle_service.repository.VehicleRepository;
import com.smartfuel.vehicle_service.response.LoginResponseDTO;
import com.smartfuel.vehicle_service.response.VehicleResponseDTO;
import com.smartfuel.vehicle_service.mock.MockDmtDatabase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.smartfuel.vehicle_service.util.FuelQuotaUtil;
import com.smartfuel.vehicle_service.util.JwtUtil;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public VehicleResponseDTO registerVehicle(@RequestBody VehicleRegistrationRequestDTO request) {

        // Validate vehicle registration with DMT
        if (!MockDmtDatabase.isVehicleRegistered(request.getVehicle().getVehicleNumber())) {
            throw new RuntimeException("Vehicle not registered in Department of Motor Traffic (DMT)");
        }

        // Check if vehicle already exists
        if (vehicleRepository.existsByVehicleNumber(request.getVehicle().getVehicleNumber())) {
            throw new IllegalArgumentException("Vehicle with this number already exists");
        }

        // Check if username already exists
        if (accountRepository.existsByUsername(request.getAccount().getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }

        // Save Account
        Account account = new Account();
        account.setUsername(request.getAccount().getUsername());
        account.setPassword(passwordEncoder.encode(request.getAccount().getPassword())); // Hash password
        account.setEmail(request.getAccount().getEmail());
        account.setRole(request.getAccount().getRole());
        accountRepository.save(account);

        // Save Vehicle
        Vehicle vehicle = new Vehicle();
        vehicle.setFirstName(request.getVehicle().getFirstName());
        vehicle.setLastName(request.getVehicle().getLastName());
        vehicle.setNic(request.getVehicle().getNic());
        vehicle.setVehicleNumber(request.getVehicle().getVehicleNumber());
        vehicle.setVehicleType(request.getVehicle().getVehicleType());
        vehicle.setFuelType(request.getVehicle().getFuelType());
        vehicle.setQrCode("QR-" + request.getVehicle().getVehicleNumber());
        vehicle.setFuelQuota(FuelQuotaUtil.getFuelQuota(request.getVehicle().getVehicleType())); 
        vehicle.setAccount(account);
        vehicleRepository.save(vehicle);

        // Return a structured response
        return new VehicleResponseDTO(
            "Vehicle and account registered successfully!",
            vehicle.getVehicleNumber(),
            account.getUsername()
        );    
    }

    @PostMapping("/auth/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO request) {
        // Find the account by username
        Account account = accountRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));

        // Validate the password
        if (!passwordEncoder.matches(request.getPassword(), account.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(account.getUsername(), account.getRole());

        // Return a structured response
        return new LoginResponseDTO(
                "Login successful",
                account.getUsername(),
                account.getRole(),
                token
        );
    }
}
