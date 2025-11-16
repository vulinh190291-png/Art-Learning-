package org.hyjava.hyall.sci.pojo.dto;

import lombok.Getter;
import lombok.Setter;
import org.hyjava.hyall.sci.service.SciService;

public class SciDTO {
    @Getter
    @Setter
    private Integer cartItemId;
    @Getter
    @Setter
    private Integer userId;
    @Getter
    @Setter
    private Integer productId;
    @Getter
    @Setter
    private Integer quantity;
}
