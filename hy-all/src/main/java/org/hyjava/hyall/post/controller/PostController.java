package org.hyjava.hyall.post.controller;

import org.hyjava.hyall.post.pojo.Post;
import org.hyjava.hyall.post.pojo.ResponseMessage;
import org.hyjava.hyall.post.pojo.dto.PostDTO;
import org.hyjava.hyall.post.service.IPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/post")
public class PostController {
    @Autowired
    IPostService postService;
    @PostMapping
    public ResponseMessage<Post> addPost(@RequestBody @Validated PostDTO post)
    {
        Post npost = postService.addPost(post);
        return ResponseMessage.success(npost);
    }

    @DeleteMapping
    public void deletePost(@RequestBody Integer postId){
        postService.deletePost(postId);
    }

    @PutMapping
    public ResponseMessage<Post> updatePost(@RequestBody @Validated PostDTO post){
        Post npost = postService.updatePost(post);
        return ResponseMessage.success(npost);
    }

    @GetMapping
    public ResponseMessage<Post> queryPost(@RequestParam Integer postId){
        Post npost = postService.queryPost(postId);
        return ResponseMessage.success(npost);
    }
}
