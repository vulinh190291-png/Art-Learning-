package org.hyjava.hyall.module.user.pojo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hyjava.hyall.common.core.result.Result;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private Integer userId;

    @Column(name="username")
    private String userName;

    @Column(name="password_hash")
    @JsonIgnore
    private String password;

    @Column(name="nickname")
    private String nickName;

    @Column(name="avatar_url")
    private String userAvatar;

    @Column(name="bio")
    private String userBio;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getUserAvatar() {
        return userAvatar;
    }

    public void setUserAvatar(String userAvatar) {
        this.userAvatar = userAvatar;
    }

    public String getUserBio() {
        return userBio;
    }

    public void setUserBio(String userBio) {
        this.userBio = userBio;
    }
}
