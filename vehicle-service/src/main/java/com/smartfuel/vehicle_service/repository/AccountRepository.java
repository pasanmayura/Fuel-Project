package com.smartfuel.vehicle_service.repository;

import com.smartfuel.vehicle_service.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {
    boolean existsByUsername(String username);
}
