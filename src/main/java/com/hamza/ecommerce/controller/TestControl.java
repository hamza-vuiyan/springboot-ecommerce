package com.hamza.ecommerce.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestControl {

    @GetMapping("/")
    public String home() {
        return "Hello, Spring Boot!";
    }
}