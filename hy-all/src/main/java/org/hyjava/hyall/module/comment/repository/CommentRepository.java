package org.hyjava.hyall.module.comment.repository;

import org.hyjava.hyall.module.comment.pojo.Comment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Integer> {
}
