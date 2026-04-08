package com.hamza.ecommerce.services;

import com.hamza.ecommerce.entity.Cart;
import com.hamza.ecommerce.entity.Customer;
import com.hamza.ecommerce.entity.Product;
import com.hamza.ecommerce.repository.CartRepository;
import com.hamza.ecommerce.repository.CustomerRepository;
import com.hamza.ecommerce.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;

    public CartService(CartRepository cartRepository,
                       CustomerRepository customerRepository,
                       ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
    }

    // Add product to cart
    public Cart addToCart(Long customerId, Long productId, int quantity) {
        Customer customer = customerRepository.findById(customerId).orElseThrow();
        Product product = productRepository.findById(productId).orElseThrow();

        Cart existing = cartRepository.findByCustomerAndProduct(customer, product);
        if (existing != null) {
            existing.setQuantity(existing.getQuantity() + quantity);
            return cartRepository.save(existing);
        }

        Cart cart = new Cart();
        cart.setCustomer(customer);
        cart.setProduct(product);
        cart.setQuantity(quantity);
        return cartRepository.save(cart);
    }

    // Get all cart items for a customer
    public List<Cart> getCartItems(Long customerId) {
        Customer customer = customerRepository.findById(customerId).orElseThrow();
        return cartRepository.findByCustomer(customer);
    }

    // Remove item from cart
    public void removeFromCart(Long cartId) {
        cartRepository.deleteById(cartId);
    }

    // Optional: clear all cart items after purchase
    public void clearCart(Long customerId) {
        Customer customer = customerRepository.findById(customerId).orElseThrow();
        List<Cart> items = cartRepository.findByCustomer(customer);
        cartRepository.deleteAll(items);
    }
}