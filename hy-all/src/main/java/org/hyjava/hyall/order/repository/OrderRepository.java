package org.hyjava.hyall.order.repository;

import org.hyjava.hyall.order.pojo.Order;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends CrudRepository<Order,Integer> {
}
