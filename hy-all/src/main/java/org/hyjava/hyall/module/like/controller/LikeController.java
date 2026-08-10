package org.hyjava.hyall.module.like.controller;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.like.pojo.Like;
import org.hyjava.hyall.module.like.pojo.dto.LikeDTO;
import org.hyjava.hyall.module.like.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/like")
public class LikeController {
    @Autowired
    LikeService likeservice;

    @PostMapping
    public Result<Like> addLike(@RequestBody LikeDTO like) {
        Like nLike = likeservice.addLike(like);
        return Result.success(nLike);
    }

    @DeleteMapping
    public Result<Like> deleteLike(@RequestBody Integer likeId) {
        likeservice.deleteLike(likeId);
        return Result.success(null);
    }

    @GetMapping
    public Result<Like> getLike(@RequestBody Integer likeId) {
        Like nlike = likeservice.queryLike(likeId);
        return Result.success(nlike);
    }

    @PutMapping
    public Result<Like> updateLike(@RequestBody  LikeDTO like) {
        Like nLike = likeservice.updateLike(like);
        return Result.success(nLike);
    }
}
