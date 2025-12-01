package org.hyjava.hyall.module.order.pojo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "order_shipping_address")
public class OrderShippingAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shipping_address_id")
    @Getter @Setter
    private Integer shippingAddressId;

    @Column(name = "order_id")
    @Getter @Setter
    private Integer orderId;

    @Column(name = "recipient_name")
    @Getter @Setter
    private String recipientName;

    @Column(name = "phone")
    @Getter @Setter
    private String phone;

    @Column(name = "region")
    @Getter @Setter
    private String region;

    @Column(name = "detail")
    @Getter @Setter
    private String detail;
}