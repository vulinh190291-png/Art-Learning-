package org.hyjava.hyall.module.artsubcategory.pojo;
import org.hyjava.hyall.common.core.result.Result;

import jakarta.persistence.*;

@Entity
@Table(name = "art_subcategory")
public class Artsubcategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subcategory_id")
    private Integer subCateId;

    @Column(name = "category_id")
    private Integer categoryId;

    @Column(name = "name")
    private String name;

    @Column(name = "cover_image_url")
    private String coverImageUrl;

    @Column(name = "introduction")
    private String introdution;

    @Column(name = "history")
    private String history;

    @Column(name = "features")
    private String features;

    @Column(name = "cultural_meaning")
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

    public String getIntrodution() {
        return introdution;
    }

    public void setIntrodution(String introdution) {
        this.introdution = introdution;
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
