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
    private String Password;
    @Getter
    @Setter
    private String nickName;
    @Getter
    @Setter
    private String userAvatar;
    @Getter
    @Setter
    private String userBio;
}
