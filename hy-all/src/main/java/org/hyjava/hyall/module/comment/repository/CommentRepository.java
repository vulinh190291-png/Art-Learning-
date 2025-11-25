package org.hyjava.hyall.module.comment.repository;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.comment.pojo.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
}
