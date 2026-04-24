package com.hamza.ecommerce.controller;
import com.hamza.ecommerce.entity.Delivery;
import com.hamza.ecommerce.entity.Product;
import com.hamza.ecommerce.repository.DeliveryRepository;
import com.hamza.ecommerce.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminControllerAPI {
    private final ProductService productService;

    @Autowired
    private DeliveryRepository deliveryRepository;

    public AdminControllerAPI(ProductService productService) {
        this.productService = productService;
    }

    // Product endpoints
    @PostMapping("/products/add")
    public Product addProduct(@RequestBody Product product){
        productService.saveProduct(product);
        return product;
    }

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/products/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @DeleteMapping("/products/{id}")
    public String deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return "Product deleted";
    }

    @PutMapping("/products/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    // Delivery endpoints
    @GetMapping("/deliveries")
    public List<Delivery> getAllDeliveries() {
        return deliveryRepository.findAll();
    }

    @GetMapping("/deliveries/customer/{customerId}")
    public List<Delivery> getDeliveriesByCustomer(@PathVariable Long customerId) {
        return deliveryRepository.findByCustomerId(customerId);
    }

    @GetMapping("/deliveries/{id}")
    public Delivery getDeliveryById(@PathVariable Long id) {
        return deliveryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Delivery not found"));
    }
}


