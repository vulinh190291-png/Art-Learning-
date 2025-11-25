package org.hyjava.hyall.module.course.service;

import org.hyjava.hyall.module.course.pojo.Course;
import org.hyjava.hyall.module.course.pojo.dto.CourseDTO;
import org.hyjava.hyall.module.course.repository.CourseRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseService implements ICourseService{
    @Autowired
    CourseRepository courseRepository;

    @Override
    public Course addCourse(CourseDTO course) {
        Course nCourse = new Course();
        BeanUtils.copyProperties(course,nCourse);
        return courseRepository.save(nCourse);
    }
    @Override
    public void deleteCourse(Integer courseId) {courseRepository.deleteById(courseId);}
    @Override
    public Course updateCourse(CourseDTO Course) {
        Integer courseId = Course.getCourseId();
        Course nCourse = courseRepository.findById(courseId).orElseThrow(()->new RuntimeException("没有结果"+courseId));
        BeanUtils.copyProperties(Course,nCourse);
        return courseRepository.save(nCourse);
    }
    @Override
    public Course  queryCourse(Integer courseId) {return null;}

}
