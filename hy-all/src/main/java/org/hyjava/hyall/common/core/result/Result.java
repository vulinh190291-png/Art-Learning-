package org.hyjava.hyall.common.core.result;

import lombok.Data; // 确保使用了 Lombok，或者手动写Getter/Setter
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor // 生成全参构造
@NoArgsConstructor  // 生成无参构造
public class Result<T> {
    private Integer code;
    private String message;
    private T data;

    // 1. 成功 - 带数据 (兼容大多数模块)
    public static <T> Result<T> success(T data) {
        return new Result<>(200, "success", data);
    }

    // 2. 成功 - 无数据 (兼容 Product 模块)
    public static <T> Result<T> success() {
        return new Result<>(200, "success", null);
    }

    // 3. 失败 (兼容所有模块)
    public static <T> Result<T> error(Integer code, String message) {
        return new Result<>(code, message, null);
    }
}