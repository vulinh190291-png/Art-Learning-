package org.hyjava.hyall.module.chapter.pojo;
import org.hyjava.hyall.common.core.result.Result;

import jakarta.persistence.*;

@Entity
@Table(name = "course_outline")
public class Chapter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chapter_id")
    private Integer chapterId;

    @Column(name = "course_id")
    private Integer courseId;

    @Column(name = "chapter_stand_id")
    private Integer chapterStandId;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
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
