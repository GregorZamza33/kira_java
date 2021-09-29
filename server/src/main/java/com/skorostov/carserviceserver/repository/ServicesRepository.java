package com.skorostov.carserviceserver.repository;

import com.skorostov.carserviceserver.entity.Services;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServicesRepository extends JpaRepository<Services, Long> {
}
