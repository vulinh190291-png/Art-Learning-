package org.hyjava.hyall.badge.service;

import org.hyjava.hyall.badge.pojo.Badge;
import org.hyjava.hyall.badge.pojo.dto.BadgeDTO;
import org.springframework.stereotype.Service;

@Service
public interface IBadgeService {
    public Badge addBadge(BadgeDTO badge);
    public void deleteBadge(Integer badgeId);
    public Badge updateBadge(BadgeDTO badge);
    public Badge queryBadge(Integer badgeId);
}
