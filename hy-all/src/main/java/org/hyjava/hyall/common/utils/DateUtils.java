package org.hyjava.hyall.common.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateUtils {
    public static final String STANDARD_FORMAT = "yyyy-MM-dd HH:mm:ss";
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern(STANDARD_FORMAT);

    /**
     * 获取当前时间字符串
     */
    public static String now() {
        return LocalDateTime.now().format(FORMATTER);
    }

    /**
     * 格式化时间
     */
    public static String format(LocalDateTime date) {
        return date != null ? date.format(FORMATTER) : null;
    }

    /**
     * 解析时间
     */
    public static LocalDateTime parse(String dateStr) {
        return LocalDateTime.parse(dateStr, FORMATTER);
    }
}