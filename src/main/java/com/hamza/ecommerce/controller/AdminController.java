package com.hamza.ecommerce.controller;

import com.hamza.ecommerce.entity.Product;
import com.hamza.ecommerce.services.ProductService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/products")
public class AdminController {
    private final ProductService productService; // instance field

    public AdminController(ProductService productService) {
        this.productService = productService; // constructor injection
    }

    @PostMapping("/add")
    public Product addProduct(@RequestBody Product product){
        productService.saveProduct(product);
        return product;
    }
}
