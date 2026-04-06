package com.hamza.ecommerce.services;

import com.hamza.ecommerce.entity.Product;
import com.hamza.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public void saveProduct(Product product) {
        productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }


    public Product updateProduct(Long id, Product newProduct) {
        Product product = productRepository.findById(id).orElse(null);

        if (product != null) {
            product.setName(newProduct.getName());
            product.setDescription(newProduct.getDescription());
            product.setPrice(newProduct.getPrice());
            product.setStock(newProduct.getStock());
            product.setImageUrl(newProduct.getImageUrl());

            return productRepository.save(product);
        }

        return null;
    }
    
}