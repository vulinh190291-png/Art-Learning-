package org.hyjava.hyall.module.artsubcategory.pojo.dto;
import org.hyjava.hyall.common.core.result.Result;

import lombok.Getter;
import lombok.Setter;

public class ArtsubcategoryDTO {
    @Getter
    @Setter
    private Integer subCateId;

    @Getter
    @Setter
    private Integer categoryId;

    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    private String coverImageUrl;

    @Getter
    @Setter
    private String introduction;

    @Getter
    @Setter
    private String history;

    @Getter
    @Setter
    private String features;

    @Getter
    @Setter
    private String culturalMeaning;
}
