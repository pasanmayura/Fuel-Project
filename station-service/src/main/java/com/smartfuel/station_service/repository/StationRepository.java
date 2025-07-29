package com.smartfuel.station_service.repository;

import com.smartfuel.station_service.model.Station;
import com.smartfuel.station_service.model.Account;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StationRepository extends JpaRepository<Station, Long> {
    boolean existsByStationName(String stationName);
    Optional <Station> findByStationName(String stationName);
    Optional <Station> findByAccount(Account account);	
}
