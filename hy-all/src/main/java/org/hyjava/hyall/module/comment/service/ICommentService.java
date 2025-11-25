package org.hyjava.hyall.module.comment.service;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.comment.pojo.Comment;
import org.hyjava.hyall.module.comment.pojo.dto.CommentDTO;

public interface ICommentService {
    public Comment addComment(CommentDTO comment);
    public Comment updateComment(CommentDTO Comment);
    public void deleteComment(Integer commentId);
    public Comment queryComment(Integer commentId);
}
