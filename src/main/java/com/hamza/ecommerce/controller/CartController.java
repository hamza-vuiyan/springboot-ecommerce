package com.hamza.ecommerce.controller;

import com.hamza.ecommerce.entity.Cart;
import com.hamza.ecommerce.services.CartService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // Add product to cart
    @PostMapping("/add/{customerId}/{productId}")
    public Cart addToCart(@PathVariable Long customerId,
                          @PathVariable Long productId,
                          @RequestParam(defaultValue = "1") int quantity) {
        return cartService.addToCart(customerId, productId, quantity);
    }

    // Get all cart items for a customer
    @GetMapping("/{customerId}")
    public List<Cart> getCart(@PathVariable Long customerId) {
        return cartService.getCartItems(customerId);
    }

    // Remove cart item
    @DeleteMapping("/remove/{cartId}")
    public void removeFromCart(@PathVariable Long cartId) {
        cartService.removeFromCart(cartId);
    }

    // Clear cart (optional)
    @DeleteMapping("/clear/{customerId}")
    public void clearCart(@PathVariable Long customerId) {
        cartService.clearCart(customerId);
    }
}