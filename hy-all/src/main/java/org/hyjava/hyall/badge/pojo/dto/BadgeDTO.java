package org.hyjava.hyall.badge.pojo.dto;

import lombok.Getter;
import lombok.Setter;
import org.hyjava.hyall.badge.pojo.Badge;

public class BadgeDTO {
    @Getter
    @Setter
    private Integer badgeId;
    @Getter
    @Setter
    private String badgeName;
    @Getter
    @Setter
    private String badgeDescription;
    @Getter
    @Setter
    private String badgeImage;
}
