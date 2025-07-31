package com.smartfuel.station_service.controller;

import com.smartfuel.station_service.model.Station;
import com.smartfuel.station_service.model.Account;
import com.smartfuel.station_service.model.FuelTransaction;
import com.smartfuel.station_service.dto.FuelTransactionDTO;
import com.smartfuel.station_service.dto.LoginRequestDTO;
import com.smartfuel.station_service.dto.StationRegistrationDTO;
import com.smartfuel.station_service.repository.AccountRepository;
import com.smartfuel.station_service.repository.FuelTransactionRepository;
import com.smartfuel.station_service.repository.StationRepository;
import com.smartfuel.station_service.response.LoginResponseDTO;
import com.smartfuel.station_service.response.StationResponseDTO;
import com.smartfuel.station_service.dto.DailyRevenueDTO;

import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.smartfuel.station_service.util.JwtUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/stations")
public class StationController {

    private static final Logger logger = LoggerFactory.getLogger(StationController.class);

    @Autowired
    private StationRepository stationRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private FuelTransactionRepository fuelTransactionRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public StationResponseDTO registerStation(@RequestBody StationRegistrationDTO stationRequest) {

        // Check if station already exists
        if (stationRepository.existsByStationName(stationRequest.getStation().getStationName())) {
            throw new IllegalArgumentException("Station with this name already exists");
        }

        // Check if username already exists
        if (accountRepository.existsByUsername(stationRequest.getAccount().getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }

        // Save Account
        Account account = new Account();
        account.setUsername(stationRequest.getAccount().getUsername());
        account.setPassword(passwordEncoder.encode(stationRequest.getAccount().getPassword()));
        account.setEmail(stationRequest.getAccount().getEmail());
        account.setRole(stationRequest.getAccount().getRole());
        accountRepository.save(account);

        // Save Station
        Station station = new Station();
        station.setFirstName(stationRequest.getStation().getFirstName());
        station.setLastName(stationRequest.getStation().getLastName());
        station.setNic(stationRequest.getStation().getNic());
        station.setStationName(stationRequest.getStation().getStationName());
        station.setLocation(stationRequest.getStation().getLocation());
        station.setPetrolCapacity(stationRequest.getStation().getPetrolCapacity());
        station.setDieselCapacity(stationRequest.getStation().getDieselCapacity());
        station.setAccount(account);
        stationRepository.save(station);

        return new StationResponseDTO(
            "Station registered successfully",
            station.getStationName(),
            station.getLocation(),
            station.getPetrolCapacity(),
            station.getDieselCapacity(),
            account.getUsername()
        );
    }

    @PostMapping("/auth/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO loginRequest) {
        // Find the account by username
        Account account = accountRepository.findByUsername(loginRequest.getUsername())
            .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));

        // Validate the password
        if (!passwordEncoder.matches(loginRequest.getPassword(), account.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        // Check if the role is StationOwner
        if (!"StationOwner".equals(account.getRole())) {
            throw new IllegalArgumentException("Access denied: Only Station Owners can log in");
        }

        // Find the station associated with the account
        Station station = stationRepository.findByAccount(account)
            .orElseThrow(() -> new IllegalArgumentException("Station not found for this account"));

        // Generate JWT token with stationId
        String token = jwtUtil.generateToken(account.getUsername(), account.getRole(), station.getId());

        // Log the generated token
        logger.info("✅ Generated JWT Token: {}", token);

        // Return the login response
        return new LoginResponseDTO(
            "Login successful",
            account.getUsername(),
            account.getRole(),
            token
        );
    }

    @GetMapping("/users/me")
    public Map<String, Object> getUserDetails(@RequestHeader("Authorization") String token) {
        String username = jwtUtil.extractUsername(token.substring(7)); // Remove "Bearer " prefix

        Account account = accountRepository.findByUsername(username)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Station station = stationRepository.findByAccount(account)
            .orElseThrow(() -> new IllegalArgumentException("Station not found for this user"));

        Map<String, Object> userDetails = Map.of(
            "username", account.getUsername(),
            "role", account.getRole(),
            "stationName", station.getStationName(),
            "location", station.getLocation(),
            "petrolCapacity", station.getPetrolCapacity(),
            "dieselCapacity", station.getDieselCapacity(),
            "availablePetrol", station.getAvailablePetrol(),
            "availableDiesel", station.getAvailableDiesel()
        );

        return userDetails;
    }

    @GetMapping("/revenue/today")
    public Map<String, BigDecimal> getTodayRevenue(@RequestHeader("Authorization") String token) {
        // Extract stationId from the token
        Long stationId = jwtUtil.extractStationId(token.substring(7)); 
        
        logger.info("✅ Station ID from token: {}", stationId);

        // Get total revenue for the station
        BigDecimal totalRevenue = fuelTransactionRepository.getTotalRevenueByStationId(stationId);
        totalRevenue = totalRevenue != null ? totalRevenue : BigDecimal.ZERO;
    
        // Return the revenue details
        return Map.of(
            "totalRevenue", totalRevenue
        );
    }

    @GetMapping("/fuel/remaining-fuel")
    public Map<String, Integer> getRemainingFuel(@RequestHeader("Authorization") String token) {
        Long stationId = jwtUtil.extractStationId(token.substring(7)); 

        Station station = stationRepository.findById(stationId)
            .orElseThrow(() -> new IllegalArgumentException("Station not found"));

        Integer availablePetrol = station.getAvailablePetrol();
        Integer availableDiesel = station.getAvailableDiesel();

        return Map.of(
            "availablePetrol", availablePetrol,
            "availableDiesel", availableDiesel
        );
    }

    @GetMapping("/fuel/fuel-transactions")
    public List<FuelTransactionDTO> getFuelTransactions(@RequestHeader("Authorization") String token) {
        // Extract stationId from the token
        Long stationId = jwtUtil.extractStationId(token.substring(7)); 

        // Fetch recent transactions for the station
        List<FuelTransaction> transactions = fuelTransactionRepository.findRecentTransactionsByStationId(stationId);

        // Map transactions to DTOs and limit to 5
        List<FuelTransactionDTO> transactionDTOs = transactions.stream()
            .limit(5) // Limit to the top 5 transactions
            .map(tx -> new FuelTransactionDTO(
                tx.getTransactionId(),
                tx.getFuelType(),
                tx.getLiters(),
                tx.getTotalPrice(),
                tx.getTransactionTime()
            ))
            .toList();

        return transactionDTOs;
    }

    @GetMapping("/revenue/weekly")
    public List<DailyRevenueDTO> getWeeklyRevenue(@RequestHeader("Authorization") String token) {
        // Extract stationId from the token
        Long stationId = jwtUtil.extractStationId(token.substring(7));

        // Fetch revenue data for the last seven days
        List<Object[]> results = fuelTransactionRepository.getLastSevenDaysRevenueByStationId(stationId);

        SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd");

        List<DailyRevenueDTO> revenueDTOs = results.stream()
            .map(row -> new DailyRevenueDTO(
                dateFormat.format(row[0]),      // Format java.sql.Date to desired format
                (String) row[1],                // fuel_type
                ((Number) row[2]).doubleValue() // total_revenue
            ))
            .toList();

        return revenueDTOs;
    }
}


