package org.hyjava.hyall.module.order.repository;

import org.hyjava.hyall.module.order.pojo.OrderShippingAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderShippingAddressRepository extends JpaRepository<OrderShippingAddress, Integer> {
}