package com.example.api_gataway.controller;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, Object> inicio() {
        return Map.of(
            "mensaje", "Funcionando correctamente",
            "aplicacion", "API GATEWAY Microservicios Factura",
            "servicios", Map.of(
                "productos", "/api/productos",
                "clientes", "/api/clientes",
                "factura", "/api/facturas"
            ),
            "version", "1.0.0"
        );
    }
}