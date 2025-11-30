package org.hyjava.hyall.module.course.service;

import org.hyjava.hyall.module.course.pojo.UserCourseChapterCompleted;
import org.hyjava.hyall.module.course.pojo.UserCourseEnrollment;
import org.hyjava.hyall.module.course.pojo.dto.ChapterCompleteDTO;
import org.hyjava.hyall.module.course.pojo.dto.EnrollRequestDTO;

import java.util.List;

public interface ICourseEnrollmentService {
    // 报名课程
    UserCourseEnrollment enrollCourse(EnrollRequestDTO enrollDTO);

    // 完成章节打卡
    UserCourseChapterCompleted completeChapter(ChapterCompleteDTO completeDTO);

    // 查询我的课程列表
    List<UserCourseEnrollment> queryMyCourses();
}