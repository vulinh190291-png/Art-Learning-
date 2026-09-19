package org.hyjava.hyall.module.artsubcategory.pojo.dto;
import org.hyjava.hyall.common.core.result.Result;

public class ArtsubcategoryDTO {
            private Integer subCateId;

            private Integer categoryId;

            private String name;

            private String coverImageUrl;

            private String introduction;

            private String history;

            private String features;

            private String culturalMeaning;

    public Integer getSubCateId() {
        return subCateId;
    }

    public void setSubCateId(Integer subCateId) {
        this.subCateId = subCateId;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCoverImageUrl() {
        return coverImageUrl;
    }

    public void setCoverImageUrl(String coverImageUrl) {
        this.coverImageUrl = coverImageUrl;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public String getHistory() {
        return history;
    }

    public void setHistory(String history) {
        this.history = history;
    }

    public String getFeatures() {
        return features;
    }

    public void setFeatures(String features) {
        this.features = features;
    }

    public String getCulturalMeaning() {
        return culturalMeaning;
    }

    public void setCulturalMeaning(String culturalMeaning) {
        this.culturalMeaning = culturalMeaning;
    }
}
