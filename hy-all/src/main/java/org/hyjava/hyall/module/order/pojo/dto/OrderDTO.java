package org.hyjava.hyall.module.order.pojo.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.Date;

public class OrderDTO {
    @Getter @Setter
    private Integer orderId;
    @Getter @Setter
    private String orderNumber;
    @Getter @Setter
    private Integer userId;
    @Getter @Setter
    private Double totalPrice;
    @Getter @Setter
    private String status;
    @Getter @Setter
    private Date createdAt;

    // 新增：前端下单必须传这个地址ID
    @Getter @Setter
    private Integer addressId;
}