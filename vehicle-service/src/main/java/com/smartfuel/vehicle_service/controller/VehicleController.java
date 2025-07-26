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

import java.util.HashMap;
import java.util.Map;

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

    @GetMapping("/users/me")
    public Map<String, String> getUserDetails(@RequestHeader("Authorization") String token) {
        // Extract username from the JWT token
        String username = jwtUtil.extractUsername(token.substring(7)); // Remove "Bearer " prefix

        // Find the account by username
        Account account = accountRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Find the vehicle associated with the account
        Vehicle vehicle = vehicleRepository.findByAccount(account)
                .orElseThrow(() -> new IllegalArgumentException("Vehicle not found"));

        // Return user details
        Map<String, String> userDetails = new HashMap<>();
        userDetails.put("username", account.getUsername());
        userDetails.put("vehicleType", vehicle.getVehicleType());
        userDetails.put("vehicleNumber", vehicle.getVehicleNumber());
        return userDetails;
    }

    @GetMapping("/{vehicleNumber}/quota")
    public Map<String, Integer> getQuotaDetails(@PathVariable String vehicleNumber) {
        // Find the vehicle by vehicle number
        Vehicle vehicle = vehicleRepository.findByVehicleNumber(vehicleNumber)
                .orElseThrow(() -> new IllegalArgumentException("Vehicle not found"));

        // Get the monthly quota based on the vehicle type
        int monthlyQuota = FuelQuotaUtil.getFuelQuota(vehicle.getVehicleType());

        // Get the remaining quota from the database
        int remainingQuota = vehicle.getFuelQuota();

        // Return quota details
        Map<String, Integer> quotaDetails = new HashMap<>();
        quotaDetails.put("monthlyQuota", monthlyQuota);
        quotaDetails.put("remainingQuota", remainingQuota);
        return quotaDetails;
    }
}
