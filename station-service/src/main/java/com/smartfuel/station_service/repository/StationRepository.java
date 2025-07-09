package com.smartfuel.station_service.repository;

import com.smartfuel.station_service.model.Station;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StationRepository extends JpaRepository<Station, Long> {
    boolean existsByStationName(String stationName);	
}
