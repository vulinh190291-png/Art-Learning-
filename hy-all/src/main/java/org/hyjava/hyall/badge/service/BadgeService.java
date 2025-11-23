package org.hyjava.hyall.badge.service;

import org.hyjava.hyall.badge.pojo.Badge;
import org.hyjava.hyall.badge.pojo.dto.BadgeDTO;
import org.hyjava.hyall.badge.repository.BadgeRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BadgeService implements IBadgeService{
    @Autowired
    BadgeRepository badgeRepository;

    @Override
    public Badge addBadge(BadgeDTO badge){
        Badge nbadge = new Badge();
        BeanUtils.copyProperties(badge,nbadge);
        return badgeRepository.save(nbadge);
    }

    @Override
    public void deleteBadge(Integer badgeId){
        badgeRepository.deleteById(badgeId);
    }

    @Override
    public Badge updateBadge(BadgeDTO Badge){
        Integer BadgeId = Badge.getBadgeId();
        Badge nbadge = badgeRepository.findById(BadgeId).orElseThrow(()-> new RuntimeException("要更新的徽章不存在，ID：" + BadgeId));
        BeanUtils.copyProperties(Badge,nbadge);
        return badgeRepository.save(nbadge);
    }
    @Override
    public Badge queryBadge(Integer badgeId) {
        return badgeRepository.findById(badgeId).get();
    }

}
