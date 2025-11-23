package org.hyjava.hyall.course.pojo;

import lombok.Getter;
import lombok.Setter;

public class ResponseMessage <T>{
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

    public static <T> org.hyjava.hyall.course.pojo.ResponseMessage<T> success(T data) {
        return new org.hyjava.hyall.course.pojo.ResponseMessage<>(200, "success", data);
    }

    public static <T> org.hyjava.hyall.course.pojo.ResponseMessage<T> error(Integer code, String message) {
        return new org.hyjava.hyall.course.pojo.ResponseMessage<>(300, message, null);
    }
}
