package org.hyjava.hyall.post.repository;

import org.hyjava.hyall.post.pojo.Post;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends CrudRepository<Post,Integer> {
}
