package org.hyjava.hyall.module.course.pojo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Entity
@Table(name = "user_course_enrollment")
public class UserCourseEnrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "enrollment_id") //
    @Getter @Setter
    private Integer enrollmentId;

    @Column(name = "user_id") //
    @Getter @Setter
    private Integer userId;

    @Column(name = "course_id") //
    @Getter @Setter
    private Integer courseId;

    @Column(name = "certificate_awarded")
    @Getter @Setter
    private Boolean certificateAwarded;

    @Column(name = "award_date") //
    @Getter @Setter
    private Date awardDate;
}