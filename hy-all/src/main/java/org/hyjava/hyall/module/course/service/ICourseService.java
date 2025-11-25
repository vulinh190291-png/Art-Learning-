package org.hyjava.hyall.module.course.service;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.course.pojo.Course;
import org.hyjava.hyall.module.course.pojo.dto.CourseDTO;

public interface ICourseService {
    public Course addCourse(CourseDTO course);
    public void deleteCourse(Integer courseId);
    public Course updateCourse(CourseDTO Course);
    public Course queryCourse(Integer courseId);
}
