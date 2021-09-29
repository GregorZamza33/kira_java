package com.skorostov.carserviceserver.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class MastersNotFoundException extends RuntimeException {

    public MastersNotFoundException(Long id) {
        super("Could not find a master: " + id);
    }

    public MastersNotFoundException() {
        super("Could not find a master");
    }
}
