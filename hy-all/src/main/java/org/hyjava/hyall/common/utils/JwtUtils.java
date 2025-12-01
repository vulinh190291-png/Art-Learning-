package org.hyjava.hyall.common.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.hyjava.hyall.common.core.resultcode.ResultCodes;
import org.hyjava.hyall.common.exception.BizException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {

    // 静态变量保留，但去掉 @Value
    private static String SECRET_STRING;

    // 利用 Spring 的 Setter 注入特性，将配置文件的值注入给静态变量
    @Value("${jwt.secret}")
    public void setSecretString(String secret) {
        JwtUtils.SECRET_STRING = secret;
    }

    // Token 有效期：24小时
    private static final long EXPIRATION = 24 * 60 * 60 * 1000L;

    private static Key getKey() {
        return Keys.hmacShaKeyFor(SECRET_STRING.getBytes());
    }

    /**
     * 生成 Token
     */
    public static String createToken(Integer userId) {
        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * 解析 Token 获取用户ID
     */
    public static Integer parseToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(getKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return Integer.parseInt(claims.getSubject());
        } catch (Exception e) {
            throw new BizException(ResultCodes.NOTLOGIN);
        }
    }
}