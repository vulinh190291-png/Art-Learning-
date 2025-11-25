package org.hyjava.hyall.module.like.pojo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "post_like")
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    @Getter
    @Setter
    private int Id;

    @Column(name = "post_id")
    @Getter
    @Setter
    private int postId;

    @Column(name = "user_id")
    @Getter
    @Setter
    private int userId;

    @Column(name = "created_at")
    @Getter
    @Setter
    private Date createdAt;
}
