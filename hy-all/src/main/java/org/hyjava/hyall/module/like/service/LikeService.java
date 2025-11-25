package org.hyjava.hyall.module.like.service;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.like.pojo.Like;
import org.hyjava.hyall.module.like.pojo.dto.LikeDTO;
import org.hyjava.hyall.module.like.repository.LikeRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikeService implements ILikeService {
    @Autowired
    LikeRepository likeRepository;

    @Override
    public Like addLike(LikeDTO like) {
        Like nlike = new Like();
        BeanUtils.copyProperties(like,nlike);
        return likeRepository.save(nlike);
    }

    @Override
    public Like updateLike(LikeDTO like) {
        Integer LikeID = like.getId();
        Like nlike = likeRepository.findById(LikeID).orElseThrow(() -> new RuntimeException("没这个东西" + LikeID));
        return likeRepository.save(nlike);
    }

    @Override
    public void deleteLike(Integer id) {
        likeRepository.deleteById(id);
    }

    @Override
    public Like queryLike(Integer id) {
        return likeRepository.findById(id).get();
    }
}
