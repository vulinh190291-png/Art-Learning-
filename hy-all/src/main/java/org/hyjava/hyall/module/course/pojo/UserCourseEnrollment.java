package org.hyjava.hyall.module.course.pojo;

import jakarta.persistence.*;
import java.util.Date;

        //给章节完成增加唯一性约束
@Entity
@Table(
        name = "user_course_enrollment",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_user_course",
                        columnNames = {
                                "user_id",
                                "course_id"
                        }
                )
        }
)
public class UserCourseEnrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "enrollment_id")
    private Integer enrollmentId;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "course_id")
    private Integer courseId;

    @Column(name = "progress")
    private Integer progress;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private CourseLearningStatus status;

    @Column(name = "completed_at")
    private Date completedAt;

    @Column(name = "certificate_awarded")
    private Boolean certificateAwarded;

    @Column(name = "award_date")
    private Date awardDate;

    public Integer getEnrollmentId() {
        return enrollmentId;
    }

    public void setEnrollmentId(Integer enrollmentId) {
        this.enrollmentId = enrollmentId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public Integer getProgress() {
        return progress;
    }

    public void setProgress(Integer progress) {
        this.progress = progress;
    }

    public CourseLearningStatus getStatus() {
        return status;
    }

    public void setStatus(CourseLearningStatus status) {
        this.status = status;
    }

    public Date getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(Date completedAt) {
        this.completedAt = completedAt;
    }

    public Boolean getCertificateAwarded() {
        return certificateAwarded;
    }

    public void setCertificateAwarded(Boolean certificateAwarded) {
        this.certificateAwarded = certificateAwarded;
    }

    public Date getAwardDate() {
        return awardDate;
    }

    public void setAwardDate(Date awardDate) {
        this.awardDate = awardDate;
    }
}