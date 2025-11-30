package org.hyjava.hyall.module.course.pojo.dto;

import lombok.Data;

@Data
public class ChapterCompleteDTO {
    private Integer courseId;  // 前端只知道课程ID
    private Integer chapterId; // 和章节ID
}