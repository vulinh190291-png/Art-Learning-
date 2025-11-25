package org.hyjava.hyall.module.order.pojo;
import org.hyjava.hyall.common.core.result.Result;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name="`order`")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    @Column(name="order_id")
    private Integer orderId;
    @Column(name="order_number")
    @Getter
    @Setter
    private String orderNumber;
    @Column(name="user_id")
    @Getter
    @Setter
    private Integer userId;
    @Column(name="total_price")
    @Getter
    @Setter
    private Double totalPrice;
    @Column(name="status")
    @Getter
    @Setter
    private String status;
    @Column(name="created_at")
    @Getter
    @Setter
    private Date createdAt;


}
