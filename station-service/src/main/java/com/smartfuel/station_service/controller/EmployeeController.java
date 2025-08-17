package com.smartfuel.station_service.controller;

import com.smartfuel.station_service.dto.EmployeeDTO;
import com.smartfuel.station_service.model.Account;
import com.smartfuel.station_service.model.Employee;
import com.smartfuel.station_service.model.Station;
import com.smartfuel.station_service.repository.AccountRepository;
import com.smartfuel.station_service.repository.EmployeeRepositorary;
import com.smartfuel.station_service.repository.StationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepositorary employeeRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private StationRepository stationRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<String> registerEmployee(@RequestBody EmployeeDTO employeeDTO) {
        if (employeeRepository.existsByEmail(employeeDTO.getEmail())) {
            return ResponseEntity.badRequest().body("Employee with this email already exists");
        }

        if (accountRepository.existsByUsername(employeeDTO.getUsername())) {
            return ResponseEntity.badRequest().body("Username is already taken.");
        }

        Station station = stationRepository.findById(employeeDTO.getStationId())
                .orElseThrow(() -> new IllegalArgumentException("Station not found for the given ID."));

        // Create a new Account entity
        Account account = new Account();
        account.setUsername(employeeDTO.getUsername());
        account.setPassword(passwordEncoder.encode(employeeDTO.getPassword()));
        account.setEmail(employeeDTO.getEmail());
        account.setRole("Employee");

        accountRepository.save(account);

        Employee employee = new Employee();
        employee.setFirstName(employeeDTO.getFirstName());
        employee.setLastName(employeeDTO.getLastName());
        employee.setEmail(employeeDTO.getEmail());
        employee.setPhone(employeeDTO.getPhone());        
        employee.setPosition(employeeDTO.getPosition());
        employee.setAddress(employeeDTO.getAddress());
        employee.setStation(station);
        employee.setAccount(account);

        employeeRepository.save(employee);
        
        return ResponseEntity.ok("Employee registered successfully");
    }    
}
