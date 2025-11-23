package org.hyjava.hyall.common.core.recall;

import lombok.Data;

// 1. 使用泛型 <T>，因为 Data 可能是 User，也可能是 List<Order>
@Data
public class Recall<T> {

    private Integer code; // 状态码：200成功，500失败，401未登录
    private String message; // 给前端的提示信息："操作成功" 或 "库存不足"
    private T data;       // 真正的数据

    // 私有构造方法，不让外面随便 new，只能通过下面的静态方法创建
    private Recall() {}

    // 成功时调用的方法
    public static <T> Recall<T> success(T data) {
        Recall<T> result = new Recall<>();
        result.code = 200; // 约定 200 是成功
        result.message = "success";
        result.data = data;
        return result;
    }

    // 成功但没有数据返回时调用（比如删除成功）
    public static <T> Recall<T> success() {
        return success(null);
    }

    // 失败时调用的方法
    public static <T> Recall<T> error(String msg) {
        Recall<T> result = new Recall<>();
        result.code = 500; // 约定 500 是通用错误
        result.message = msg;
        return result;
    }
}