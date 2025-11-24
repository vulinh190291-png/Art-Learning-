package org.hyjava.hyall.orderitem.repository;

import org.hyjava.hyall.orderitem.pojo.Orderitem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderitemRepository extends CrudRepository<Orderitem, Integer> {
}
