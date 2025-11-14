package org.hyjava.hyall.user.pojo;

import javax.annotation.processing.Generated;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name=="user_id")
    private Integer userId;
    @Column(name=="user_name")
    private String userName;
    @Column(name=="password")
    private String password;
    @Column(name=="email")
    private String email;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }
}
