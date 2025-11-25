package org.hyjava.hyall.common.exception;

import org.hyjava.hyall.common.core.result.Result; // 使用统一的 Result
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public Result<String> handleException(Exception e) {
        e.printStackTrace(); // 生产环境建议使用 log.error("...", e);
        // 统一返回 Result 格式
        return Result.error(500, e.getMessage() != null ? e.getMessage() : "服务器内部错误");
    }

    // 你可以添加自定义异常处理，例如:
    // @ExceptionHandler(MyBizException.class) ...
}