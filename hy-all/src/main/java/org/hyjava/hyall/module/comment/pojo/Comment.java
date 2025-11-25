package org.hyjava.hyall.module.comment.pojo;
import org.hyjava.hyall.common.core.result.Result;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "post_comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    @Column(name = "comment_id")
    private Integer commentId;
    @Getter
    @Setter
    @Column(name = "post_id")
    private Integer postId;
    @Getter
    @Setter
    @Column(name = "user_id")
    private Integer userId;
    @Getter
    @Setter
    @Column(name = "content")
    private String content;
    @Getter
    @Setter
    @Column(name = "created_at")
    private Date createdAt;
}
