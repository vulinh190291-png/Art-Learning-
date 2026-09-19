package org.hyjava.hyall.module.instructor.pojo;
import org.hyjava.hyall.common.core.result.Result;

import jakarta.persistence.*;

@Entity
@Table(name = "course_instructor")
public class Instructor {
    @Id
    @Column(name = "instructor_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

    @Column(name = "name")
    private String Name;

    @Column(name = "title")
    private String Title;

    @Column(name = "avatar_url")
    private String AvatarUrl;

    @Column(name = "bio")
    private String Bio;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getTitle() {
        return Title;
    }

    public void setTitle(String title) {
        Title = title;
    }

    public String getAvatarUrl() {
        return AvatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        AvatarUrl = avatarUrl;
    }

    public String getBio() {
        return Bio;
    }

    public void setBio(String bio) {
        Bio = bio;
    }
}
