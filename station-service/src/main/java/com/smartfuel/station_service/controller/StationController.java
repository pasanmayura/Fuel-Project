package com.smartfuel.station_service.controller;

import com.smartfuel.station_service.model.Station;
import com.smartfuel.station_service.model.Account;
import com.smartfuel.station_service.dto.StationRegistrationDTO;
import com.smartfuel.station_service.repository.AccountRepository;
import com.smartfuel.station_service.repository.StationRepository;
import com.smartfuel.station_service.response.StationResponseDTO;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RestController
@RequestMapping("/api/stations")
public class StationController {

    @Autowired
    private StationRepository stationRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

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
}
