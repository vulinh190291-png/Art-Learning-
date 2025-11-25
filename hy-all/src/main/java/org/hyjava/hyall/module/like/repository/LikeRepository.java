package org.hyjava.hyall.module.like.repository;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.like.pojo.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like,Integer> {
}
