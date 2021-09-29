package com.skorostov.carserviceserver.controllers;

import com.skorostov.carserviceserver.entity.Cars;
import com.skorostov.carserviceserver.entity.Masters;
import com.skorostov.carserviceserver.entity.Services;
import com.skorostov.carserviceserver.entity.Works;
import com.skorostov.carserviceserver.exception.CarsNotFoundException;
import com.skorostov.carserviceserver.exception.MastersNotFoundException;
import com.skorostov.carserviceserver.exception.ServicesNotFoundException;
import com.skorostov.carserviceserver.exception.WorksNotFoundException;
import com.skorostov.carserviceserver.repository.CarsRepository;
import com.skorostov.carserviceserver.repository.MastersRepository;
import com.skorostov.carserviceserver.repository.ServicesRepository;
import com.skorostov.carserviceserver.repository.WorksRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/api/works", produces = "application/json")
public class WorksController {

    private final CarsRepository carsRepository;
    private final MastersRepository mastersRepository;
    private final ServicesRepository servicesRepository;
    private final WorksRepository worksRepository;

    @Autowired
    public WorksController(CarsRepository carsRepository,
                           MastersRepository mastersRepository,
                           ServicesRepository servicesRepository,
                           WorksRepository worksRepository) {
        this.carsRepository = carsRepository;
        this.mastersRepository = mastersRepository;
        this.servicesRepository = servicesRepository;
        this.worksRepository = worksRepository;
    }

    @GetMapping
    public List<Works> getAll() {
        return worksRepository.findAll();
    }

    @GetMapping("/{id}")
    public Works getWorkById(@PathVariable Long id) {
        return worksRepository.findById(id)
                .orElseThrow(() -> new WorksNotFoundException(id));
    }

    @PostMapping(consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public Works newWork(@Valid @RequestBody Works newWork) {
        return worksRepository.save(newWork);
    }

    @PutMapping(path = "/{id}", consumes = "application/json")
    public Works updateWork(@Valid @RequestBody Works work, @PathVariable Long id) {
        Cars car = carsRepository.findById(work.getCar().getId())
                .orElseThrow(CarsNotFoundException::new);

        Masters master = mastersRepository.findById(work.getMaster().getId())
                .orElseThrow(MastersNotFoundException::new);

        Services service = servicesRepository.findById(work.getService().getId())
                .orElseThrow(ServicesNotFoundException::new);

        return worksRepository.findById(id)
                .map(a -> {
                    a.setDate_work(work.getDate_work());
                    a.setCar(car);
                    a.setMaster(master);
                    a.setService(service);
                    return worksRepository.save(a);
                })
                .orElseGet(() -> {
                   work.setId(id);
                   return worksRepository.save(work);
                });
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteWork(@PathVariable Long id) {
        try {
            worksRepository.deleteById(id);
        } catch (EmptyResultDataAccessException ignored) {
        }
    }
}
