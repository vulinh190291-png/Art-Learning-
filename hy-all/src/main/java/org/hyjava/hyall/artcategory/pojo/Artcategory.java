package org.hyjava.hyall.artcategory.pojo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "art_category")
public class Artcategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    @Column(name = "category_id")
    private Integer categoryId;

    @Column(name = "category_name")
    @Getter
    @Setter
    private String categoryName;

    @Column(name = "icon_url")
    @Getter
    @Setter
    private String iconUrl;
}
