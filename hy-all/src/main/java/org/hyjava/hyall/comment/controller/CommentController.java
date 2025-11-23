package org.hyjava.hyall.comment.controller;

import org.hyjava.hyall.comment.pojo.Comment;
import org.hyjava.hyall.comment.pojo.dto.CommentDTO;
import org.hyjava.hyall.comment.service.ICommentService;
import org.hyjava.hyall.post.pojo.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comment")
public class CommentController {
    @Autowired
    ICommentService commentService;
    @PostMapping
    public ResponseMessage<Comment> addComment(@RequestBody @Validated CommentDTO comment) {
        Comment ncomment= commentService.addComment(comment);
        return ResponseMessage.success(ncomment);
    }

    @DeleteMapping
    public void deleteComment(@RequestBody Integer commentId) {
        commentService.deleteComment(commentId);
    }

    @PutMapping
    public ResponseMessage<Comment> updateComment(@RequestBody @Validated CommentDTO comment) {
        Comment ncomment= commentService.updateComment(comment);
        return ResponseMessage.success(ncomment);
    }

    @GetMapping
    public ResponseMessage<Comment>  queryComment(@RequestBody  Integer commentId) {
        Comment ncomment= commentService.queryComment(commentId);
        return ResponseMessage.success(ncomment);
    }
}
