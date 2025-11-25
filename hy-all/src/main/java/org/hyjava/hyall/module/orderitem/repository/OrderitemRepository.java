package org.hyjava.hyall.module.orderitem.repository;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.orderitem.pojo.Orderitem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderitemRepository extends JpaRepository<Orderitem, Integer> {
}
