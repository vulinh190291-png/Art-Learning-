package org.hyjava.hyall.module.course.controller;

import org.hyjava.hyall.module.course.pojo.Course;
import org.hyjava.hyall.module.course.pojo.ResponseMessage;
import org.hyjava.hyall.module.course.pojo.dto.CourseDTO;
import org.hyjava.hyall.module.course.service.ICourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/course")
public class CourseController {
    @Autowired
    ICourseService courseService;
    @PostMapping
    public ResponseMessage<Course> addCourse(@RequestBody CourseDTO course){
        Course ncourse = courseService.addCourse(course);
        return ResponseMessage.success(ncourse);
    }
    @DeleteMapping
    public void deleteCourse(@RequestBody Integer courseId){
        courseService.deleteCourse(courseId);
    }

    @PutMapping
    public ResponseMessage<Course> updateCourse(@RequestBody @Validated CourseDTO course){
        Course ncourse = courseService.updateCourse(course);
        return ResponseMessage.success(ncourse);
    }

    @GetMapping
    public ResponseMessage<Course> queryCourse(@RequestBody Integer courseId){
        Course ncourse = courseService.queryCourse(courseId);
        return ResponseMessage.success(ncourse);
    }
}
