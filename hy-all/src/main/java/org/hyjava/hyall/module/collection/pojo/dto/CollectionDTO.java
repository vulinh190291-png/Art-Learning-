package org.hyjava.hyall.module.collection.pojo.dto;
import org.hyjava.hyall.common.core.result.Result;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

public class CollectionDTO {
    @Getter
    @Setter
    private Integer collectionId;
    @Getter
    @Setter
    private Integer postId;
    @Getter
    @Setter
    private Integer userId;
    @Getter
    @Setter
    private Date createAt;
}
