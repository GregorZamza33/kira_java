package com.skorostov.carserviceserver;

import com.skorostov.carserviceserver.entity.User;
import com.skorostov.carserviceserver.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DatabaseLoader implements CommandLineRunner {
        private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public DatabaseLoader(UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.findByUsername("user@user").isEmpty() && userRepository.findByUsername("admin@admin").isEmpty()) {
            userRepository.save(new User("user@user", passwordEncoder.encode("password"), List.of("ROLE_USER")));
            userRepository.save(new User("admin@admin", passwordEncoder.encode("admin"), List.of("ROLE_ADMIN")));
        }
    }
}
