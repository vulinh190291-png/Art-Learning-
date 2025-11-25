package org.hyjava.hyall.module.orderitem.repository;

import org.hyjava.hyall.module.orderitem.pojo.Orderitem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderitemRepository extends CrudRepository<Orderitem, Integer> {
}
