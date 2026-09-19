package org.hyjava.hyall.module.shopcartitem.pojo;
import org.hyjava.hyall.common.core.result.Result;
import jakarta.persistence.*;

@Entity
@Table(name = "shopping_cart_item")
public class Sci {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cartItemId;

    private Integer userId;

    private Integer productId;

    private Integer quantity;

    public Integer getCartItemId() {
        return cartItemId;
    }

    public void setCartItemId(Integer cartItemId) {
        this.cartItemId = cartItemId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
