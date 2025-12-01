package org.hyjava.hyall.module.course.controller;

import org.hyjava.hyall.common.core.result.Result;
import org.hyjava.hyall.module.course.pojo.UserCourseChapterCompleted;
import org.hyjava.hyall.module.course.pojo.UserCourseEnrollment;
import org.hyjava.hyall.module.course.pojo.dto.ChapterCompleteDTO;
import org.hyjava.hyall.module.course.pojo.dto.EnrollRequestDTO;
import org.hyjava.hyall.module.course.service.ICourseEnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course/enroll") // 定义统一路由前缀
public class CourseEnrollmentController {

    @Autowired
    ICourseEnrollmentService enrollmentService;

    // 1. 报名课程
    // POST /course/enroll
    @PostMapping
    public Result<UserCourseEnrollment> enroll(@RequestBody EnrollRequestDTO enrollDTO) {
        return Result.success(enrollmentService.enrollCourse(enrollDTO));
    }

    // 2. 章节打卡 (完成章节)
    // POST /course/enroll/complete
    @PostMapping("/complete")
    public Result<UserCourseChapterCompleted> completeChapter(@RequestBody ChapterCompleteDTO completeDTO) {
        return Result.success(enrollmentService.completeChapter(completeDTO));
    }

    // 3. 查询我的课程
    // GET /course/enroll/my
    @GetMapping("/my")
    public Result<List<UserCourseEnrollment>> getMyCourses() {
        return Result.success(enrollmentService.queryMyCourses());
    }
}