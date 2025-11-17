package org.hyjava.hyall.orderitem.repository;

import org.hyjava.hyall.orderitem.pojo.OrderItem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends CrudRepository<OrderItem, Integer> {
}
