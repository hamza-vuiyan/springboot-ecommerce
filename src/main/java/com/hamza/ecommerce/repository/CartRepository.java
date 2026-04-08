package com.hamza.ecommerce.repository;

import com.hamza.ecommerce.entity.Cart;
import com.hamza.ecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {

    // Get all cart items for a specific customer
    List<Cart> findByCustomer(Customer customer);

    // Optional: find cart item by customer and product (useful to increase quantity instead of duplicate)
    Cart findByCustomerAndProduct(Customer customer, com.hamza.ecommerce.entity.Product product);
}