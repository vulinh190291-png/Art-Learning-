package org.hyjava.hyall.module.order.pojo;

import jakarta.persistence.*;

@Entity
@Table(name = "order_shipping_address")
public class OrderShippingAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shipping_address_id")
    private Integer shippingAddressId;

    @Column(name = "order_id")
    private Integer orderId;

    @Column(name = "recipient_name")
    private String recipientName;

    @Column(name = "phone")
    private String phone;

    @Column(name = "region")
    private String region;

    @Column(name = "detail")
    private String detail;

    public Integer getShippingAddressId() {
        return shippingAddressId;
    }

    public void setShippingAddressId(Integer shippingAddressId) {
        this.shippingAddressId = shippingAddressId;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public String getRecipientName() {
        return recipientName;
    }

    public void setRecipientName(String recipientName) {
        this.recipientName = recipientName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }
}