package org.hyjava.hyall.address.pojo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user_address")
public class Address {
    @Id
    @Column(name = "id")
    @Getter
    @Setter
    private Integer id;

    @Column(name = "user_id")
    @Getter
    @Setter
    private Integer userId;

    @Column(name = "recipient_name")
    @Getter
    @Setter
    private String recipientName;

    @Column(name = "phone")
    @Getter
    @Setter
    private String phone;

    @Column(name = "region")
    @Getter
    @Setter
    private String region;

    @Column(name = "detail_address")
    @Getter
    @Setter
    private String detailAddress;

    @Column(name = "is_default")
    @Getter
    @Setter
    private Boolean isDefault;

}
