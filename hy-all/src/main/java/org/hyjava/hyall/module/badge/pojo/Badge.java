package org.hyjava.hyall.module.badge.pojo;
import org.hyjava.hyall.common.core.result.Result;

import jakarta.persistence.*;

@Entity
@Table(name = "badge")
public class Badge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "badge_id")
    private Integer badgeId;

    @Column(name = "name")
    private String name;

    @Column(name="description")
    private String description;

    @Column(name="icon_url")
    private String iconUrl;

    public Integer getBadgeId() {
        return badgeId;
    }

    public void setBadgeId(Integer badgeId) {
        this.badgeId = badgeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIconUrl() {
        return iconUrl;
    }

    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }
}
