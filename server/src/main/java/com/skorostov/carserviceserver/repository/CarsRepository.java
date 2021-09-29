package com.skorostov.carserviceserver.repository;

import com.skorostov.carserviceserver.entity.Cars;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarsRepository extends JpaRepository<Cars, Long> {
}
