package com.smartfuel.station_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.smartfuel.station_service.model.Employee;

import java.util.Optional;


public interface EmployeeRepositorary extends JpaRepository<Employee, Long> {
    boolean existsByEmail(String email);
    Optional<Employee> findByEmail(String email);
    Optional<Employee> findById(Long id);
    Optional<Employee> findByAccountId(Long accountId);    
}
