package org.hyjava.hyall.common.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.hyjava.hyall.common.core.resultcode.ResultCodes;
import org.hyjava.hyall.common.exception.BizException;
import org.hyjava.hyall.common.utils.JwtUtils;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

@Component // 注入 Spring 容器
public class AuthInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 1. 对于 OPTIONS 预检请求直接放行
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        // 2. 获取 Token (通常在 Header: Authorization)
        String token = request.getHeader("Authorization");
        if (!StringUtils.hasLength(token)) {
            throw new BizException(ResultCodes.NOTLOGIN);
        }

        // 3. 处理 "Bearer " 前缀（如果前端传了的话）
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        // 4. 验证并解析
        Integer userId = JwtUtils.parseToken(token);

        // 5. 存入上下文
        UserContext.setUserId(userId);

        return true; // 放行
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        // 6. 请求结束，务必清理 ThreadLocal，防止内存泄漏
        UserContext.remove();
    }
}