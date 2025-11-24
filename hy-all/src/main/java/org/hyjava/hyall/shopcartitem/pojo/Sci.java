package org.hyjava.hyall.shopcartitem.pojo;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "shopping_cart_item")
public class Sci {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
