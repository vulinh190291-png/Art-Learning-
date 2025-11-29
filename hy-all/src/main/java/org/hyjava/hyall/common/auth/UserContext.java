package org.hyjava.hyall.common.auth;

/**
 * 用户上下文
 * 利用 ThreadLocal 存储当前请求的用户ID，实现请求隔离
 */
public class UserContext {
    private static final ThreadLocal<Integer> userHolder = new ThreadLocal<>();

    public static void setUserId(Integer userId) {
        userHolder.set(userId);
    }

    public static Integer getUserId() {
        return userHolder.get();
    }

    // 必须调用此方法清理，防止内存泄漏
    public static void remove() {
        userHolder.remove();
    }
}