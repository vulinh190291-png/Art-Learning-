package org.hyjava.hyall.module.chapter.pojo.dto;
import org.hyjava.hyall.common.core.result.Result;

import lombok.Getter;
import lombok.Setter;

public class ChapterDTO {
    @Getter
    @Setter
    private Integer chapterId;
    @Getter
    @Setter
    private Integer courseId;
    @Getter
    @Setter
    private Integer chapterStandId;
    @Getter
    @Setter
    private String title;
    @Getter
    @Setter
    private String content;
}
