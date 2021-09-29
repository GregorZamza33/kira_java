package com.skorostov.carserviceserver.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class CarsNotFoundException extends RuntimeException {

    public CarsNotFoundException(Long id) {
        super("Could not find a car: " + id);
    }

    public CarsNotFoundException() {
        super("Could not find a car");
    }
}
