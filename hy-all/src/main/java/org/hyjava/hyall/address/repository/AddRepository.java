package org.hyjava.hyall.address.repository;

import org.hyjava.hyall.address.pojo.Address;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddRepository extends CrudRepository<Address, Integer> {
}
