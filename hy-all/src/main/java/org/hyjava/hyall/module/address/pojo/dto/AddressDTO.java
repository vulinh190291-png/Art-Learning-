package org.hyjava.hyall.module.address.pojo.dto;
import org.hyjava.hyall.common.core.result.Result;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

public class AddressDTO {
    @Getter
    @Setter
    private Integer addressId;
    @Getter
    @Setter
    private Integer userId;
    @Getter
    @Setter
    private String recipientName;
    @Getter
    @Setter
    @Length(min = 11, max = 11, message = "手机号必须为11位")
    private String phone;
    @Getter
    @Setter
    private String region;
    @Getter
    @Setter
    private String detailAddress;
    @Getter
    @Setter
    private Boolean isDefault;
}
