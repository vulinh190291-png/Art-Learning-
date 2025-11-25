package org.hyjava.hyall.module.comment.pojo.dto;
import org.hyjava.hyall.common.core.result.Result;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

public class CommentDTO {
    @Getter
    @Setter
    private Integer commentId;
    @Getter
    @Setter
    private Integer postId;
    @Getter
    @Setter
    private Integer userId;
    @Getter
    @Setter
    private String content;
    @Getter
    @Setter
    private Date createdAt;
}
