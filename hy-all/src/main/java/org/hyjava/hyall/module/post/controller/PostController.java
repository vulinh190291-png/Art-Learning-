package org.hyjava.hyall.module.post.controller;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.post.pojo.Post;
import org.hyjava.hyall.module.post.pojo.dto.PostDTO;
import org.hyjava.hyall.module.post.service.IPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/post")
public class PostController {
    @Autowired
    IPostService postService;
    @PostMapping
    public Result<Post> addPost(@RequestBody @Validated PostDTO post)
    {
        Post npost = postService.addPost(post);
        return Result.success(npost);
    }

    @DeleteMapping
    public void deletePost(@RequestBody Integer postId){
        postService.deletePost(postId);
    }

    @PutMapping
    public Result<Post> updatePost(@RequestBody @Validated PostDTO post){
        Post npost = postService.updatePost(post);
        return Result.success(npost);
    }

    @GetMapping
    public Result<Post> queryPost(@RequestParam Integer postId){
        Post npost = postService.queryPost(postId);
        return Result.success(npost);
    }
}
