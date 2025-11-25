package org.hyjava.hyall.module.post.repository;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.post.pojo.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post,Integer> {
}
