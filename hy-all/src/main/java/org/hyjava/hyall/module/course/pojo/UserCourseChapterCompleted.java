package org.hyjava.hyall.module.course.pojo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user_course_chapter_completed")
public class UserCourseChapterCompleted {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "completion_id") // 修正主键名
    @Getter @Setter
    private Integer completionId;

    @Column(name = "enrollment_id") //
    @Getter @Setter
    private Integer enrollmentId;

    @Column(name = "chapter_id") //
    @Getter @Setter
    private Integer chapterId;
}