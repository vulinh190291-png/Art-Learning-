package org.hyjava.hyall.like.service;

import org.hyjava.hyall.like.pojo.Like;
import org.hyjava.hyall.like.pojo.dto.LikeDTO;
import org.hyjava.hyall.like.repository.LikeRepository;
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
