package org.hyjava.hyall.module.course.pojo;
import org.hyjava.hyall.common.core.result.Result;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    @Column(name = "course_id")
    private Integer courseId;
    @Getter
    @Setter
    @Column(name = "instructor_id")
    private Integer instructorId;
    @Getter
    @Setter
    @Column(name = "title")
    private String title;
    @Getter
    @Setter
    @Column(name = "cover_image_url")
    private String coverImageUrl;
    @Getter
    @Setter
    @Column(name = "price")
    private Double price;
    @Getter
    @Setter
    @Column(name = "type")
    private String type;
    @Getter
    @Setter
    @Column(name = "student_count")
    private Integer studentCount;
    @Getter
    @Setter
    @Column(name = "description")
    private String description;
}
