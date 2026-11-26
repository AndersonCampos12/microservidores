package com.example.api_gataway.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class NotFoundController {

    @GetMapping("/not-found")
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, Object> notFound() {
        return Map.of(
            "status", "404",
            "error", "Not Found",
            "message", "La API no fue encontrada."
        );
    }
}