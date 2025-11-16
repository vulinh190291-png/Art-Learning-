package org.hyjava.hyall.order.pojo.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

public class OrderDTO {
    @Getter
    @Setter
    private Integer orderId;
    @Getter
    @Setter
    private String orderNumber;
    @Getter
    @Setter
    private Integer userId;
    @Getter
    @Setter
    private Double totalPrice;
    @Getter
    @Setter
    private String status;
    @Getter
    @Setter
    private Date createdAt;  //Date?
}
