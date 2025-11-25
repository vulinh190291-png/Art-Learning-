package org.hyjava.hyall.module.comment.controller;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.comment.pojo.Comment;
import org.hyjava.hyall.module.comment.pojo.dto.CommentDTO;
import org.hyjava.hyall.module.comment.service.ICommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comment")
public class CommentController {
    @Autowired
    ICommentService commentService;
    @PostMapping
    public Result<Comment> addComment(@RequestBody @Validated CommentDTO comment) {
        Comment ncomment= commentService.addComment(comment);
        return Result.success(ncomment);
    }

    @DeleteMapping
    public void deleteComment(@RequestBody Integer commentId) {
        commentService.deleteComment(commentId);
    }

    @PutMapping
    public Result<Comment> updateComment(@RequestBody @Validated CommentDTO comment) {
        Comment ncomment= commentService.updateComment(comment);
        return Result.success(ncomment);
    }

    @GetMapping
    public Result<Comment>  queryComment(@RequestBody  Integer commentId) {
        Comment ncomment= commentService.queryComment(commentId);
        return Result.success(ncomment);
    }
}
