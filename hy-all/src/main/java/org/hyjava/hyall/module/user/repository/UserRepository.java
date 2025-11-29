package org.hyjava.hyall.module.user.repository;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.user.pojo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUserName(String userName);
}
