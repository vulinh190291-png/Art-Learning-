package org.hyjava.hyall.common.core.resultcode;

import lombok.Getter;

public enum ResultCodes {
    SUCCESS(200, "成功"),
    NOTFOUND(404, "没有找到资源"),
    NOTLOGIN(401, "未登录"),
    UNAUTH(402, "没有权限"),
    REFUSE(403, "服务器拒绝连接"),
    TOOLARGE(413, "请求实体过大");

    @Getter
    public final int code;
    @Getter
    public final String msg;

    ResultCodes(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}
