package org.hyjava.hyall.module.product.repository;

import org.hyjava.hyall.module.product.pojo.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends CrudRepository<Product,Integer> {
}
