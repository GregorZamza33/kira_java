package com.skorostov.carserviceserver.repository;

import com.skorostov.carserviceserver.entity.Works;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorksRepository extends JpaRepository<Works, Long> {
}
