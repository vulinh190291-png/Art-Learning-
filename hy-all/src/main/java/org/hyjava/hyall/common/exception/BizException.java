package org.hyjava.hyall.common.exception;

import lombok.Getter;
import org.hyjava.hyall.common.core.resultcode.ResultCodes;

//这里自定义我们的错误
public class BizException extends RuntimeException {
    @Getter
    public Integer code;

    public BizException (ResultCodes code) {
        super(code.getMsg());
        this.code = code.getCode();
    }
}
