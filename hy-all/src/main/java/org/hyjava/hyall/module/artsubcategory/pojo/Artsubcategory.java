package org.hyjava.hyall.module.artsubcategory.pojo;
import org.hyjava.hyall.common.core.result.Result;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "art_subcategory")
public class Artsubcategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    @Column(name = "subcategory_id")
    private Integer subCateId;

    @Column(name = "category_id")
    @Getter
    @Setter
    private Integer categoryId;

    @Column(name = "name")
    @Getter
    @Setter
    private String name;

    @Column(name = "cover_image_url")
    @Getter
    @Setter
    private String coverImageUrl;

    @Column(name = "introduction")
    @Getter
    @Setter
    private String introdution;

    @Column(name = "history")
    @Getter
    @Setter
    private String history;

    @Column(name = "features")
    @Getter
    @Setter
    private String features;

    @Column(name = "cultural_meaning")
    @Getter
    @Setter
    private String culturalMeaning;
}
