package org.hyjava.hyall.module.like.pojo;

import org.hyjava.hyall.common.core.result.Result;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "post_like")
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private int Id;

    @Column(name = "post_id")
    private int postId;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "created_at")
    private Date createdAt;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
