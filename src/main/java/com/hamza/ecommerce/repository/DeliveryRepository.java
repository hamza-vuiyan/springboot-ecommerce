package com.hamza.ecommerce.repository;

import com.hamza.ecommerce.entity.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    List<Delivery> findByCustomerId(Long customerId);
    List<Delivery> findByOrderId(Long orderId);
}

