package org.hyjava.hyall.user.pojo.dto;

import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

public class UserDTO {
    @Getter
    @Setter
    private Integer userId;
    @Getter
    @Setter
    private String userName;
    @Getter
    @Setter
    private String password;
    @Getter
    @Setter
    @Email(message = "请确保电子邮件格式格式正确")
    private String email;
    @Getter
    @Setter
    @Length(min = 11, max = 11, message = "您的电话号码必须为11位中国大陆号码") //电话号必须11位
    private String phone;
    @Getter
    @Setter
    private String address;
}
