package org.hyjava.hyall.module.address.repository;

import org.hyjava.hyall.module.address.pojo.Address;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddRepository extends CrudRepository<Address, Integer> {
}
