package org.hyjava.hyall.module.product.repository;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.product.pojo.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product,Integer> {
}
