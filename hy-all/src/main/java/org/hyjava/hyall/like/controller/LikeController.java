package org.hyjava.hyall.like.controller;

import org.hyjava.hyall.address.pojo.ResponseMessage;
import org.hyjava.hyall.like.pojo.Like;
import org.hyjava.hyall.like.pojo.dto.LikeDTO;
import org.hyjava.hyall.like.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/like")
public class LikeController {
    @Autowired
    LikeService likeservice;

    @PostMapping
    public ResponseMessage<Like> addLike(@RequestBody LikeDTO like) {
        Like nLike = likeservice.addLike(like);
        return ResponseMessage.success(nLike);
    }

    @DeleteMapping
    public ResponseMessage<Like> deleteLike(@RequestBody Integer likeId) {
        likeservice.deleteLike(likeId);
        return ResponseMessage.success(null);
    }

    @GetMapping
    public ResponseMessage<Like> getLike(@RequestBody Integer likeId) {
        Like nlike = likeservice.queryLike(likeId);
        return ResponseMessage.success(nlike);
    }

    @PutMapping
    public ResponseMessage<Like> updateLike(@RequestBody LikeDTO like) {
        Like nLike = likeservice.updateLike(like);
        return ResponseMessage.success(nLike);
    }
}
