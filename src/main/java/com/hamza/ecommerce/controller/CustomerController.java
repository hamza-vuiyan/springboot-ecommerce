package com.hamza.ecommerce.controller;

import com.hamza.ecommerce.entity.Customer;
import com.hamza.ecommerce.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @PostMapping("/register")
    public Customer register(@RequestBody Customer customer) {
        return customerService.register(customer);
    }

    @PostMapping("/login")
    public ResponseEntity<Customer> login(@RequestBody Customer customer) {
        Customer c = customerService.login(customer.getEmail(), customer.getPassword());
        if(c != null) {
            return ResponseEntity.ok(c); // valid user
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // invalid credentials
        }
    }
}