package com.hamza.ecommerce.entity;


import com.hamza.ecommerce.repository.CustomerRepository;
import jakarta.persistence.*;
import org.apache.catalina.User;

@Entity
@Table(name = "ecom_orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String deliveryAddress;

    private Double totalPrice;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Customer user;

    public Order() {}

    public Order(String deliveryAddress, Double totalPrice, Customer user) {
        this.deliveryAddress = deliveryAddress;
        this.totalPrice = totalPrice;
        this.user = user;
    }

    // getters setters

    public Customer getUser() {
        return user;
    }

    public void setUser(Customer user) {
        this.user = user;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}