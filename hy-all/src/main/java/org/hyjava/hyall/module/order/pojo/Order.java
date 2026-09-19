package org.hyjava.hyall.module.order.pojo;
import org.hyjava.hyall.common.core.result.Result;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="`order`")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="order_id")
    private Integer orderId;

    @Column(name="order_number")
    private String orderNumber;

    @Column(name="user_id")
    private Integer userId;

    @Column(name="total_price")
    private Double totalPrice;

    @Column(name="status")
    private String status;

    @Column(name="created_at")
    private Date createdAt;

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
