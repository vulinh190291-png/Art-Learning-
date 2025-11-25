package org.hyjava.hyall.module.like.pojo.dto;
import org.hyjava.hyall.common.core.result.Result;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

public class LikeDTO {
    @Getter
    @Setter
    private int Id;

    @Getter
    @Setter
    private int postId;

    @Getter
    @Setter
    private int userId;

    @Getter
    @Setter
    private Date createdAt;
}
