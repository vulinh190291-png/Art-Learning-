package org.hyjava.hyall.common.exception;

import org.hyjava.hyall.common.core.result.Result; // 使用统一的 Result
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

//这里承接通用错误并转换成result
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public Result<String> handleException(Exception e) {
        e.printStackTrace(); // 上线之前改成 log.error("...", e);
        return Result.error(500, e.getMessage() != null ? e.getMessage() : "服务器通用错误");
    }
}