package org.hyjava.hyall.collection.pojo.dto;

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
