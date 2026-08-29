package org.hyjava.hyall.module.course.pojo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

        //给章节完成增加唯一性约束
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
public class UserCourseEnrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "enrollment_id")
    @Getter
    @Setter
    private Integer enrollmentId;

    @Column(name = "user_id")
    @Getter
    @Setter
    private Integer userId;

    @Column(name = "course_id")
    @Getter
    @Setter
    private Integer courseId;

    @Column(name = "progress")
    @Getter
    @Setter
    private Integer progress;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    @Getter
    @Setter
    private CourseLearningStatus status;

    @Column(name = "completed_at")
    @Getter
    @Setter
    private Date completedAt;

    @Column(name = "certificate_awarded")
    @Getter
    @Setter
    private Boolean certificateAwarded;

    @Column(name = "award_date")
    @Getter
    @Setter
    private Date awardDate;
}