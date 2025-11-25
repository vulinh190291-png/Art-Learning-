package org.hyjava.hyall.module.badge.repository;

import org.hyjava.hyall.module.badge.pojo.Badge;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BadgeRepository extends CrudRepository<Badge,Integer> {
}
