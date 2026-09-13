package org.hyjava.hyall.common.exception;

import org.hyjava.hyall.common.core.resultcode.ResultCodes;

//这里自定义我们的错误
public class BizException extends RuntimeException {
    private Integer code;

    public BizException (ResultCodes code) {
        super(code.getMsg());
        this.code = code.getCode();
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }
}
