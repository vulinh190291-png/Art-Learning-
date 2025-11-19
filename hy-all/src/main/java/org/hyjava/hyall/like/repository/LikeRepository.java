package org.hyjava.hyall.like.repository;

import org.hyjava.hyall.like.pojo.Like;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends CrudRepository<Like,Integer> {
}
