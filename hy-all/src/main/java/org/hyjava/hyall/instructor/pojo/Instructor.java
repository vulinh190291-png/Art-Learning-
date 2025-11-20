package org.hyjava.hyall.instructor.pojo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "course_instructor")
public class Instructor {
    @Id
    @Column(name = "instructor_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    private int Id;

    @Column(name = "name")
    @Getter
    @Setter
    private String Name;

    @Column(name = "title")
    @Getter
    @Setter
    private String Title;

    @Column(name = "avatar_url")
    @Getter
    @Setter
    private String AvatarUrl;

    @Column(name = "bio")
    @Getter
    @Setter
    private String Bio;
}
