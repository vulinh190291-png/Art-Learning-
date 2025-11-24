package org.hyjava.hyall.product.repository;

import org.hyjava.hyall.product.pojo.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends CrudRepository<Product,Integer> {
}
