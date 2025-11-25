package org.hyjava.hyall.common.config;
import org.hyjava.hyall.common.core.result.Result;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration // 配置类
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 所有的接口都可以被访问
                .allowedOriginPatterns("*") // 允许所有的来源（开发测试方便，生产环境建议指定具体的域名）
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 允许的方法
                .allowCredentials(true) // 允许携带 Cookie
                .maxAge(3600);
    }
}