package org.hyjava.hyall.module.collection.pojo;
import org.hyjava.hyall.common.core.result.Result;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "post_collection")
public class Collection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    @Column(name = "collection_id")
    private Integer collectionId;
    @Column(name = "post_id")
    @Getter
    @Setter
    private Integer postId;
    @Column(name = "user_id")
    @Getter
    @Setter
    private Integer userId;
    @Column(name = "create_at")
    @Getter
    @Setter
    private Date createAt;

}
