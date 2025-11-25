package org.hyjava.hyall.module.badge.pojo;
import org.hyjava.hyall.common.core.result.Result;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "badge")
public class Badge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "badge_id")
    @Getter
    @Setter
    private Integer badgeId;

    @Column(name = "name")
    @Getter
    @Setter
    private String name;
    @Column(name="description")
    @Getter
    @Setter
    private String description;
    @Column(name="icon_url")
    @Getter
    @Setter
    private String iconUrl;

}
