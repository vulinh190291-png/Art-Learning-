package org.hyjava.hyall.module.artcategory.pojo.dto;
import org.hyjava.hyall.common.core.result.Result;

public class ArtcategoryDTO {
            private Integer categoryId;

            private String categoryName;

            private String iconUrl;

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getIconUrl() {
        return iconUrl;
    }

    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }
}
