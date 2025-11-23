package org.hyjava.hyall.course.service;

import org.hyjava.hyall.course.pojo.Course;
import org.hyjava.hyall.course.pojo.dto.CourseDTO;

public interface ICourseService {
    public Course addCourse(CourseDTO course);
    public void deleteCourse(Integer courseId);
    public Course updateCourse(CourseDTO Course);
    public Course queryCourse(Integer courseId);
}
