package org.hyjava.hyall.product.pojo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

public class product {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Getter
        @Setter
        @Column(name="id")
        private Integer Id;
        @Column(name="name")
        @Getter
        @Setter
        private String Name;
        @Column(name="category")
        @Getter
        @Setter
        private String category;
        @Column(name="price")
        @Getter
        @Setter
        private String price;
        @Column(name="stock")
        @Getter
        @Setter
        private String stock;
        @Column(name="image_url")
        @Getter
        @Setter
        private String image_url;
        @Column(name="description")
        @Getter
        @Setter
        private String description;
}

