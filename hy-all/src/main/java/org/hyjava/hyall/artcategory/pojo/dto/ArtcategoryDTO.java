package org.hyjava.hyall.artcategory.pojo.dto;

import lombok.Getter;
import lombok.Setter;

public class ArtcategoryDTO {
    @Getter
    @Setter
    private Integer categoryId;

    @Getter
    @Setter
    private String categoryName;

    @Getter
    @Setter
    private String iconUrl;
}
