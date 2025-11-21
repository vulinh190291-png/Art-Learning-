package org.hyjava.hyall.badge.repository;

import org.hyjava.hyall.badge.pojo.Badge;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BadgeRepository extends CrudRepository<Badge,Integer> {
}
