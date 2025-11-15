package org.hyjava.hyall.user.pojo;

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
    @Column(name="id")
    private Integer userId;
    @Column(name="username")
    @Getter
    @Setter
    private String userName;
    @Column(name="password")
    @Getter
    @Setter
    private String Password;
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
