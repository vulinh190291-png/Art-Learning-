package org.hyjava.hyall.module.address.repository;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.address.pojo.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddRepository extends JpaRepository<Address, Integer> {
}
