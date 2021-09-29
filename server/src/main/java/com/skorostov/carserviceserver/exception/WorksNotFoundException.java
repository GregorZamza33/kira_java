package com.skorostov.carserviceserver.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class WorksNotFoundException extends RuntimeException {

    public WorksNotFoundException(Long id) {
        super("Could not find a work: " + id);
    }
}
