package com.skorostov.carserviceserver.controllers;

import com.skorostov.carserviceserver.entity.Services;
import com.skorostov.carserviceserver.exception.ServicesNotFoundException;
import com.skorostov.carserviceserver.repository.ServicesRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/api/services", produces = "application/json")
public class ServicesController {

    private final ServicesRepository servicesRepository;

    @Autowired
    public ServicesController(ServicesRepository servicesRepository) {
        this.servicesRepository = servicesRepository;
    }

    @GetMapping
    public List<Services> getAll() {
        return servicesRepository.findAll();
    }

    @GetMapping("/{id}")
    public Services getServiceById(@PathVariable Long id) {
        return servicesRepository.findById(id)
                .orElseThrow(() -> new ServicesNotFoundException(id));
    }

    @PostMapping(consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public Services newService(@Valid @RequestBody Services services) {
        return servicesRepository.save(services);
    }

    @PutMapping(path = "/{id}", consumes = "application/json")
    public Services updateService(@Valid @RequestBody Services service, @PathVariable Long id) {
        return servicesRepository.findById(id)
                .map(a -> {
                    a.setCost_foreign(service.getCost_foreign());
                    a.setCost_our(service.getCost_our());
                    a.setName(service.getName());
                    return servicesRepository.save(a);
                })
                .orElseGet(() -> {
                    service.setId(id);
                    return servicesRepository.save(service);
                });
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteService(@PathVariable Long id) {
        try {
            servicesRepository.deleteById(id);
        } catch (EmptyResultDataAccessException ignored) {
        }
    }
}
