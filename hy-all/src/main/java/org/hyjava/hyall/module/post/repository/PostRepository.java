package org.hyjava.hyall.module.post.repository;

import org.hyjava.hyall.module.post.pojo.Post;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends CrudRepository<Post,Integer> {
}
