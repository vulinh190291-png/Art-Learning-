package org.hyjava.hyall.shopcartitem.pojo.dto;

import lombok.Getter;
import lombok.Setter;

public class SciDTO {
    @Getter
    @Setter
    private Integer cartItemId;
    @Getter
    @Setter
    private Integer userId;
    @Getter
    @Setter
    private Integer productId;
    @Getter
    @Setter
    private Integer quantity;
}
