package org.hyjava.hyall.core.exception;

import org.hyjava.hyall.core.recall.Recall;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

// @RestControllerAdvice 是 Spring 的注解，意思是“我是所有 Controller 的增强版”
@RestControllerAdvice
public class GlobalExceptionHandler {

    // 拦截所有 Exception 类型的异常
    @ExceptionHandler(Exception.class)
    public Recall<String> handleException(Exception e) {
        // 打印错误日志到控制台，方便你看报错
        e.printStackTrace();

        // 告诉前端报错了，并没有崩
        return Recall.error(e.getMessage() != null ? e.getMessage() : "服务器开小差了");
    }

    // 你甚至可以拦截特定异常，比如空指针
    // @ExceptionHandler(NullPointerException.class) ...
}