package org.hyjava.hyall.product.repository;

import org.hyjava.hyall.product.pojo.product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface productRepository extends CrudRepository<product,Integer> {
}
