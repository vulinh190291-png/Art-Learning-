package org.hyjava.hyall.common.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.hyjava.hyall.common.core.resultcode.ResultCodes;
import org.hyjava.hyall.common.exception.BizException;

import java.security.Key;
import java.util.Date;

public class JwtUtils {

    // 生产环境请把这个密钥放到 application.properties 里去读取
    // 密钥必须足够长（至少256位），这里硬编码仅为快速开发
    private static final String SECRET_STRING = "hyjava_backend_project_secret_key_needs_to_be_very_long_for_security";
    private static final Key key = Keys.hmacShaKeyFor(SECRET_STRING.getBytes());

    // Token 有效期：24小时
    private static final long EXPIRATION = 24 * 60 * 60 * 1000L;

    /**
     * 生成 Token
     */
    public static String createToken(Integer userId) {
        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * 解析 Token 获取用户ID
     * 解析失败会直接抛出异常
     */
    public static Integer parseToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return Integer.parseInt(claims.getSubject());
        } catch (Exception e) {
            // 解析失败（过期或篡改），抛出未登录异常
            throw new BizException(ResultCodes.NOTLOGIN);
        }
    }
}