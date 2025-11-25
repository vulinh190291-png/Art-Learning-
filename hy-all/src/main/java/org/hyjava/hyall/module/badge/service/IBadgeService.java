package org.hyjava.hyall.module.badge.service;

import org.hyjava.hyall.module.badge.pojo.Badge;
import org.hyjava.hyall.module.badge.pojo.dto.BadgeDTO;
import org.springframework.stereotype.Service;

@Service
public interface IBadgeService {
    public Badge addBadge(BadgeDTO badge);
    public void deleteBadge(Integer badgeId);
    public Badge updateBadge(BadgeDTO badge);
    public Badge queryBadge(Integer badgeId);
}
