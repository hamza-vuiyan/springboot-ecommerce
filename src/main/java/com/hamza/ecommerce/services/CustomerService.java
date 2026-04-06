package com.hamza.ecommerce.services;


import com.hamza.ecommerce.entity.Customer;
import com.hamza.ecommerce.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public Customer register(Customer customer) {
        customer.setRole("CUSTOMER"); // all registered users are customers
        return customerRepository.save(customer);
    }

    public Customer login(String email, String password) { //use email and password for login
        Customer c = customerRepository.findByEmail(email);
        if(c != null && c.getPassword().equals(password)) {
            return c;
        }
        return null;
    }
}
