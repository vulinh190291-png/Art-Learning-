package org.hyjava.hyall.module.like.pojo.dto;
import org.hyjava.hyall.common.core.result.Result;

import java.util.Date;

public class LikeDTO {
            private int Id;

            private int postId;

            private int userId;

            private Date createdAt;

    public int getId() {
        return Id;
    }

    public void setId(int Id) {
        this.Id = Id;
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
