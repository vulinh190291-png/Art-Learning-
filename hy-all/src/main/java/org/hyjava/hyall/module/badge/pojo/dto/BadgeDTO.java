package org.hyjava.hyall.module.badge.pojo.dto;
import org.hyjava.hyall.common.core.result.Result;

import lombok.Getter;
import lombok.Setter;

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
