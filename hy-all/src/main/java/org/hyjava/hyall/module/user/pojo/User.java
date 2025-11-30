package org.hyjava.hyall.module.user.pojo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hyjava.hyall.common.core.result.Result;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    @Column(name="user_id")
    private Integer userId;
    @Column(name="username")
    @Getter
    @Setter
    private String userName;
    @Column(name="password_hash")
    @Getter
    @Setter
    @JsonIgnore
    private String password;
    @Column(name="nickname")
    @Getter
    @Setter
    private String nickName;
    @Column(name="avatar_url")
    @Getter
    @Setter
    private String userAvatar;
    @Column(name="bio")
    @Getter
    @Setter
    private String userBio;
}
