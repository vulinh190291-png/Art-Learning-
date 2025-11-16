package org.hyjava.hyall.product.pojo;

import lombok.Getter;
import lombok.Setter;

public class ResponseMessage<T> {
    @Getter
    @Setter
    private Integer code;
    @Getter
    @Setter
    private String message;
    @Getter
    @Setter
    private T data;
    public ResponseMessage(Integer code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public static <T> org.hyjava.hyall.address.pojo.ResponseMessage<T> success(T data) {
        return new org.hyjava.hyall.address.pojo.ResponseMessage<>(200, "success", data);
    }

    public static <T> org.hyjava.hyall.address.pojo.ResponseMessage<T> success() {
        return new org.hyjava.hyall.address.pojo.ResponseMessage<>(200, "success", null);
    }

    public static <T> org.hyjava.hyall.address.pojo.ResponseMessage<T> error(Integer code, String message) {
        return new org.hyjava.hyall.address.pojo.ResponseMessage<>(300, message, null);
    }
}
