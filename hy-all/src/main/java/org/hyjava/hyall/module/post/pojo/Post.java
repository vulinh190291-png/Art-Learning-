package org.hyjava.hyall.module.post.pojo;
import org.hyjava.hyall.common.core.result.Result;
import jakarta.persistence.*;
import lombok.Setter;
import lombok.Getter;

import java.util.Date;

@Entity
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    @Column(name = "post_id")
    private Integer postId;
    @Column(name = "user_id")
    @Getter
    @Setter
    private Integer userId;
    @Column(name = "subcategory_id")
    @Getter
    @Setter
    private Integer subcategoryId;
    @Column(name = "title")
    @Getter
    @Setter
    private String title;
    @Column(name = "description")
    @Getter
    @Setter
    private String description;
    @Column(name = "image_url")
    @Getter
    @Setter
    private String imageUrl;
    @Column(name = "created_at")
    @Getter
    @Setter
    private Date createdAt;


}
