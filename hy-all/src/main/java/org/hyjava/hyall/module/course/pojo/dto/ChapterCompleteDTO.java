package org.hyjava.hyall.module.course.pojo.dto;

public class ChapterCompleteDTO {
    private Integer courseId;  // 前端只知道课程ID
    private Integer chapterId; // 和章节ID

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public Integer getChapterId() {
        return chapterId;
    }

    public void setChapterId(Integer chapterId) {
        this.chapterId = chapterId;
    }
}