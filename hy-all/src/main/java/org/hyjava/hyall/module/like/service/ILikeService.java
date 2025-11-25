package org.hyjava.hyall.module.like.service;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.like.pojo.Like;
import org.hyjava.hyall.module.like.pojo.dto.LikeDTO;
import org.springframework.stereotype.Service;

@Service
public interface ILikeService {
    public Like addLike(LikeDTO like);
    public void deleteLike(Integer id);
    public Like updateLike(LikeDTO like);
    public Like queryLike(Integer id);
}
