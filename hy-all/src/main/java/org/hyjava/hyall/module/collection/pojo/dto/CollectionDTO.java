package org.hyjava.hyall.module.collection.pojo.dto;
import org.hyjava.hyall.common.core.result.Result;

import java.util.Date;

public class CollectionDTO {
            private Integer collectionId;
            private Integer postId;
            private Integer userId;
            private Date createAt;

    public Integer getCollectionId() {
        return collectionId;
    }

    public void setCollectionId(Integer collectionId) {
        this.collectionId = collectionId;
    }

    public Integer getPostId() {
        return postId;
    }

    public void setPostId(Integer postId) {
        this.postId = postId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }
}
