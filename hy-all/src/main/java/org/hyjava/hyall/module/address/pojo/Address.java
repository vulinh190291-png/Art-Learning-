package org.hyjava.hyall.module.address.pojo;
import org.hyjava.hyall.common.core.result.Result;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user_address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    @Getter
    @Setter
    private Integer addressId;

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

    @Column(name = "detail")
    @Getter
    @Setter
    private String detailAddress;

    @Column(name = "is_default")
    @Getter
    @Setter
    private Boolean isDefault;

}
