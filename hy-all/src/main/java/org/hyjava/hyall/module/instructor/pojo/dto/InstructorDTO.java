package org.hyjava.hyall.module.instructor.pojo.dto;
import org.hyjava.hyall.common.core.result.Result;

import lombok.Getter;
import lombok.Setter;

public class InstructorDTO {
    @Getter
    @Setter
    private int Id;

    @Getter
    @Setter
    private String Name;

    @Getter
    @Setter
    private String Title;

    @Getter
    @Setter
    private String AvatarUrl;

    @Getter
    @Setter
    private String Bio;
}
