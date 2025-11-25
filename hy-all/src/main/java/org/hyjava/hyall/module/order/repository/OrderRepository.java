package org.hyjava.hyall.module.order.repository;

import org.hyjava.hyall.module.order.pojo.Order;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends CrudRepository<Order,Integer> {
}
