package com.smartfuel.station_service.repository;

import com.smartfuel.station_service.model.FuelTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface FuelTransactionRepository extends JpaRepository<FuelTransaction, Long> {

    @Query("SELECT SUM(ft.totalPrice) FROM FuelTransaction ft WHERE DATE(ft.transactionTime) = CURRENT_DATE AND ft.station.id = :stationId")
    BigDecimal getTotalRevenueByStationId(Long stationId);
}

