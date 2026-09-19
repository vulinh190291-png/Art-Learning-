package org.hyjava.hyall.module.chapter.pojo.dto;
import org.hyjava.hyall.common.core.result.Result;

public class ChapterDTO {
            private Integer chapterId;
            private Integer courseId;
            private Integer chapterStandId;
            private String title;
            private String content;

    public Integer getChapterId() {
        return chapterId;
    }

    public void setChapterId(Integer chapterId) {
        this.chapterId = chapterId;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public Integer getChapterStandId() {
        return chapterStandId;
    }

    public void setChapterStandId(Integer chapterStandId) {
        this.chapterStandId = chapterStandId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
