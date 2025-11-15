package org.hyjava.hyall.shcart;
import lombok.Getter;
import lombok.Setter;

public class shopping_cart_item {
    @Getter
    @Setter
    private Integer id;
    @Getter
    @Setter
    private Integer user_id;
    @Getter
    @Setter
    private Integer product_id;
    @Getter
    @Setter
    private Integer quantity;
}
