package com.hamza.ecommerce.services;

import com.hamza.ecommerce.DTO.BuyRequest;
import com.hamza.ecommerce.entity.Cart;
import com.hamza.ecommerce.entity.Customer;
import com.hamza.ecommerce.entity.Order;
import com.hamza.ecommerce.entity.Product;
import com.hamza.ecommerce.repository.CartRepository;
import com.hamza.ecommerce.repository.CustomerRepository;
import com.hamza.ecommerce.repository.OrderRepository;
import com.hamza.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private OrderRepository orderRepository;

    public Order buyProduct(BuyRequest request) {

        Cart cart = cartRepository.findById(request.getCartItemId())
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        Product product = cart.getProduct();

        if (product.getStock() < cart.getQuantity()) {
            throw new RuntimeException("Not enough stock");
        }

        // reduce stock
        product.setStock(product.getStock() - cart.getQuantity());
        productRepository.save(product);

        // get customer
        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        // create order
        Order order = new Order(
                request.getAddress(),
                product.getPrice() * cart.getQuantity(),
                customer
        );

        orderRepository.save(order);

        // remove cart item
        cartRepository.delete(cart);

        return order;
    }
}