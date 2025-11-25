package org.hyjava.hyall.module.badge.repository;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.badge.pojo.Badge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BadgeRepository extends JpaRepository<Badge,Integer> {
}
