package org.hyjava.hyall.module.collection.pojo;
import org.hyjava.hyall.common.core.result.Result;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "post_collection")
public class Collection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "collection_id")
    private Integer collectionId;

    @Column(name = "post_id")
    private Integer postId;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "create_at")
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
