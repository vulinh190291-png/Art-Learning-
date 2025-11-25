package org.hyjava.hyall.module.user.pojo.dto;
import org.hyjava.hyall.common.core.result.Result;

import lombok.Getter;
import lombok.Setter;

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
    private String nickName;
    @Getter
    @Setter
    private String userAvatar;
    @Getter
    @Setter
    private String userBio;
}
