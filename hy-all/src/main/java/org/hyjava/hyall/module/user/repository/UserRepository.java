package org.hyjava.hyall.module.user.repository;

import org.hyjava.hyall.module.user.pojo.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
}
