package org.hyjava.hyall.module.course.pojo;

import jakarta.persistence.*;

@Entity
@Table(
        name = "user_course_chapter_completed",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_enrollment_chapter",
                        columnNames = {
                                "enrollment_id",
                                "chapter_id"
                        }
                )
        }
)
public class UserCourseChapterCompleted {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "completion_id") // 修正主键名
    private Integer completionId;

    @Column(name = "enrollment_id") //
    private Integer enrollmentId;

    @Column(name = "chapter_id") //
    private Integer chapterId;

    public Integer getCompletionId() {
        return completionId;
    }

    public void setCompletionId(Integer completionId) {
        this.completionId = completionId;
    }

    public Integer getEnrollmentId() {
        return enrollmentId;
    }

    public void setEnrollmentId(Integer enrollmentId) {
        this.enrollmentId = enrollmentId;
    }

    public Integer getChapterId() {
        return chapterId;
    }

    public void setChapterId(Integer chapterId) {
        this.chapterId = chapterId;
    }
}