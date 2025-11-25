package org.hyjava.hyall.module.orderitem.pojo.dto;
import org.hyjava.hyall.common.core.result.Result;

import lombok.Getter;
import lombok.Setter;

public class OrderitemDTO {
    @Getter
    @Setter
    private Integer orderItemId;
    @Getter
    @Setter
    private Integer orderId;
    @Getter
    @Setter
    private Integer productId;
    @Getter
    @Setter
    private Integer quantity;
    @Getter
    @Setter
    private Double priceAtPurchase;
    @Getter
    @Setter
    private String productNameSnapshot;
    @Getter
    @Setter
    private String productImageSnapshot;

}
