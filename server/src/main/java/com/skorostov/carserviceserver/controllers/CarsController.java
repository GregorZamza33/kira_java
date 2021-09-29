package com.skorostov.carserviceserver.controllers;

import com.skorostov.carserviceserver.entity.Cars;
import com.skorostov.carserviceserver.exception.CarsNotFoundException;
import com.skorostov.carserviceserver.repository.CarsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/api/cars", produces = "application/json")
public class CarsController {

    private final CarsRepository carsRepository;

    @Autowired
    public CarsController(CarsRepository carsRepository) {
        this.carsRepository = carsRepository;
    }

    @GetMapping
    public List<Cars> getAll() {
        return carsRepository.findAll();
    }

    @GetMapping("/{id}")
    public Cars getCarById(@PathVariable Long id) {
        return carsRepository.findById(id)
                .orElseThrow(() -> new CarsNotFoundException(id));
    }

    @PostMapping(consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public Cars newCar(@Valid @RequestBody Cars newCar) {
        return carsRepository.save(newCar);
    }

    @PutMapping(path = "/{id}", consumes = "application/json")
    public Cars updateCar(@Valid @RequestBody Cars car, @PathVariable Long id) {
        return carsRepository.findById(id)
                .map(a -> {
                    a.setColor(car.getColor());
                    a.setIsForeign(car.getIsForeign());
                    a.setMark(car.getMark());
                    a.setNum(car.getNum());
                    return carsRepository.save(a);
                })
                .orElseGet(() -> {
                    car.setId(id);
                    return carsRepository.save(car);
                });
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCar(@PathVariable Long id) {
        try {
            carsRepository.deleteById(id);
        } catch (EmptyResultDataAccessException ignored) {
        }
    }
}
