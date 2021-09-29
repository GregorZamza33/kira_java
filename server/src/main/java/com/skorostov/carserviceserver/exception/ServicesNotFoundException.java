package com.skorostov.carserviceserver.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ServicesNotFoundException extends RuntimeException {

    public ServicesNotFoundException(Long id) {
        super("Could not find a service: " + id);
    }

    public ServicesNotFoundException() {
        super("Could not find a service");
    }
}
