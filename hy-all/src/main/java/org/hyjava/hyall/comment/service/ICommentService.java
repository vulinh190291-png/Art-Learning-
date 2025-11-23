package org.hyjava.hyall.comment.service;

import org.hyjava.hyall.comment.pojo.Comment;
import org.hyjava.hyall.comment.pojo.dto.CommentDTO;

public interface ICommentService {
    public Comment addComment(CommentDTO comment);
    public Comment updateComment(CommentDTO Comment);
    public void deleteComment(Integer commentId);
    public Comment queryComment(Integer commentId);
}
