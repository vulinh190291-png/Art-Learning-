package org.hyjava.hyall.module.orderitem.pojo;
import org.hyjava.hyall.common.core.result.Result;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "order_item")
public class Orderitem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id")
    @Getter
    @Setter
    private Integer orderItemId;

    @Column(name = "order_id")
    @Getter
    @Setter
    private Integer orderId;
    @Column(name="product_id")
    @Getter
    @Setter
    private Integer productId;
    @Column(name="quantity")
    @Getter
    @Setter
    private Integer quantity;
    @Column(name="price_at_purchase")
    @Getter
    @Setter
    private Double priceAtPurchase;
    @Column(name="product_name_snapshot")
    @Getter
    @Setter
    private String productNameSnapshot;
    @Column(name="product_image_snapshot")
    @Getter
    @Setter
    private String productImageSnapshot;
}
