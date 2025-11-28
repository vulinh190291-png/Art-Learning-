package org.hyjava.hyall.common.core.result;

import lombok.Data; // 确保使用了 Lombok，或者手动写Getter/Setter
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.hyjava.hyall.common.core.resultcode.ResultCodes;

@Data
@AllArgsConstructor // 生成全参构造
@NoArgsConstructor  // 生成无参构造
public class Result<T> {
    private Integer code;
    private String message;
    private T data;

    // 成功有数据
    public static <T> Result<T> success(T data) {
        return new Result<>(200, "success", data);
    }

    // 成功无数据
    public static <T> Result<T> success() {
        return new Result<>(200, "success", null);
    }

    // 失败兼容版
    public static <T> Result<T> error(Integer code, String message) {
        return new Result<>(code, message, null);
    }

    // 失败特定版
    public static <T> Result<T> error(ResultCodes code) {
        return new Result<>(code.getCode(), code.getMsg(), null);
    }
}