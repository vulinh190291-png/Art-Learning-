package org.hyjava.hyall.module.chapter.pojo;
import org.hyjava.hyall.common.core.result.Result;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "course_outline")
public class Chapter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    @Column(name = "chapter_id")
    private Integer chapterId;
    @Getter
    @Setter
    @Column(name = "course_id")
    private Integer courseId;
    @Getter
    @Setter
    @Column(name = "chapter_stand_id")
    private Integer chapterStandId;
    @Getter
    @Setter
    @Column(name = "title")
    private String title;
    @Getter
    @Setter
    @Column(name = "content")
    private String content;
}
