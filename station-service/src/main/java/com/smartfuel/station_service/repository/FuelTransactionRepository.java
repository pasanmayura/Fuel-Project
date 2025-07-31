package com.smartfuel.station_service.repository;

import com.smartfuel.station_service.model.FuelTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface FuelTransactionRepository extends JpaRepository<FuelTransaction, Long> {

    @Query("SELECT SUM(ft.totalPrice) FROM FuelTransaction ft WHERE DATE(ft.transactionTime) = CURRENT_DATE AND ft.station.id = :stationId")
    BigDecimal getTotalRevenueByStationId(Long stationId);

    @Query("SELECT ft FROM FuelTransaction ft WHERE ft.station.id = :stationId ORDER BY ft.transactionTime DESC")
    List<FuelTransaction> findRecentTransactionsByStationId(Long stationId);

    @Query(value = "SELECT transaction_date, fuel_type, total_revenue " +
                   "FROM station_fuel_daily_revenue " +
                   "WHERE station_id = :stationId AND transaction_date >= CURRENT_DATE - INTERVAL 7 DAY " +
                   "ORDER BY transaction_date ASC", nativeQuery = true)
    List<Object[]> getLastSevenDaysRevenueByStationId(Long stationId);
}

