package org.hyjava.hyall.module.badge.pojo;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "user_badge")
public class UserBadge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_badge_id")
    private Integer userBadgeId;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "badge_id")
    private Integer badgeId;

    @Column(name = "earned_at")
    private Date earnedAt;

    public Integer getUserBadgeId() {
        return userBadgeId;
    }

    public void setUserBadgeId(Integer userBadgeId) {
        this.userBadgeId = userBadgeId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getBadgeId() {
        return badgeId;
    }

    public void setBadgeId(Integer badgeId) {
        this.badgeId = badgeId;
    }

    public Date getEarnedAt() {
        return earnedAt;
    }

    public void setEarnedAt(Date earnedAt) {
        this.earnedAt = earnedAt;
    }
}