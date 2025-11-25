package org.hyjava.hyall.module.product.pojo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    @Column(name="product_id")
    private Integer Id;
    @Column(name = "seller_id")
    @Getter
    @Setter
    private Integer sellerId;
    @Column(name="name")
    @Getter
    @Setter
    private String Name;
    @Column(name="price")
    @Getter
    @Setter
    private Double Price;
    @Column(name="stock")
    @Getter
    @Setter
    private Integer Stock;
    @Column(name="cover_image_url")
    @Getter
    @Setter
    private String imageUrl;
    @Column(name="description")
    @Getter
    @Setter
    private String Description;
    @Column(name = "is_certified")
    @Getter
    @Setter
    private Boolean isCertified;
}

