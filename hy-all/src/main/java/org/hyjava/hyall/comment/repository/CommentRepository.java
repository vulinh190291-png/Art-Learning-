package org.hyjava.hyall.comment.repository;

import org.hyjava.hyall.comment.pojo.Comment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Integer> {
}
