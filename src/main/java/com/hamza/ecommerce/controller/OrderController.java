package com.hamza.ecommerce.controller;

import com.hamza.ecommerce.DTO.BuyRequest;
import com.hamza.ecommerce.entity.Order;
import com.hamza.ecommerce.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/buy")
    public Order buyProduct(@RequestBody BuyRequest request) {
        return orderService.buyProduct(request);
    }
}