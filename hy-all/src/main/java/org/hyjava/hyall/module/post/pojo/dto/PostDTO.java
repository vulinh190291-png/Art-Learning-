package org.hyjava.hyall.module.post.pojo.dto;
import org.hyjava.hyall.common.core.result.Result;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

public class PostDTO {
    @Getter
    @Setter
    private Integer postId;
    @Getter
    @Setter
    private Integer userId;
    @Getter
    @Setter
    private Integer subcategoryId;
    @Getter
    @Setter
    private String title;
    @Getter
    @Setter
    private String description;
    @Getter
    @Setter
    private String imageUrl;
    @Getter
    @Setter
    private Date createdAt;
}
