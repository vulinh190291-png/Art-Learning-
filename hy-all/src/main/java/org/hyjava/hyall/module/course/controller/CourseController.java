package org.hyjava.hyall.module.course.controller;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.course.pojo.Course;
import org.hyjava.hyall.module.course.pojo.dto.CourseDTO;
import org.hyjava.hyall.module.course.service.ICourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course")
public class CourseController {
    @Autowired
    ICourseService courseService;
    @PostMapping
    public Result<Course> addCourse(@RequestBody CourseDTO course){
        Course ncourse = courseService.addCourse(course);
        return Result.success(ncourse);
    }
    @DeleteMapping
    public void deleteCourse(@RequestBody Integer courseId){
        courseService.deleteCourse(courseId);
    }

    @PutMapping
    public Result<Course> updateCourse(@RequestBody @Validated CourseDTO course){
        Course ncourse = courseService.updateCourse(course);
        return Result.success(ncourse);
    }

    @GetMapping
    public Result<Course> queryCourse(@RequestBody Integer courseId){
        Course ncourse = courseService.queryCourse(courseId);
        return Result.success(ncourse);
    }

    @PostMapping
    public Result<List<Course>> queryAllCourse(@RequestBody List<Integer> courseIdList){
        List<Course> list = courseService.queryAllCourses(courseIdList);
        return Result.success(list);
    }
}
