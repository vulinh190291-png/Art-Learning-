package org.hyjava.hyall.product.pojo.dto;

import lombok.Getter;
import lombok.Setter;

public class ProductDTO {
    @Getter
    @Setter
    private Integer Id;

    @Getter
    @Setter
    private Integer sellerId;

    @Getter
    @Setter
    private String Name;

    @Getter
    @Setter
    private Double Price;

    @Getter
    @Setter
    private Integer Stock;

    @Getter
    @Setter
    private String imageUrl;

    @Getter
    @Setter
    private String Description;

    @Getter
    @Setter
    private Boolean isCertified;
}
