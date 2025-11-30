package org.hyjava.hyall.module.course.service;

import org.hyjava.hyall.common.auth.UserContext;
import org.hyjava.hyall.common.core.resultcode.ResultCodes;
import org.hyjava.hyall.common.exception.BizException;
import org.hyjava.hyall.module.course.pojo.UserCourseChapterCompleted;
import org.hyjava.hyall.module.course.pojo.UserCourseEnrollment;
import org.hyjava.hyall.module.course.pojo.dto.ChapterCompleteDTO;
import org.hyjava.hyall.module.course.pojo.dto.EnrollRequestDTO;
import org.hyjava.hyall.module.course.repository.UserCourseChapterCompletedRepository;
import org.hyjava.hyall.module.course.repository.UserCourseEnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class CourseEnrollmentService implements ICourseEnrollmentService {

    @Autowired
    UserCourseEnrollmentRepository enrollmentRepository;

    @Autowired
    UserCourseChapterCompletedRepository completedRepository;

    @Override
    @Transactional
    public UserCourseEnrollment enrollCourse(EnrollRequestDTO enrollDTO) {
        Integer userId = UserContext.getUserId();
        Integer courseId = enrollDTO.getCourseId();

        // 1. 检查是否重复报名
        UserCourseEnrollment existing = enrollmentRepository.findByUserIdAndCourseId(userId, courseId);
        if (existing != null) {
            throw new BizException(ResultCodes.OVERTIME);
        }

        // 2. 创建报名记录
        UserCourseEnrollment enrollment = new UserCourseEnrollment();
        enrollment.setUserId(userId);
        enrollment.setCourseId(courseId);
        enrollment.setCertificateAwarded(false); // 默认未获得证书

        return enrollmentRepository.save(enrollment);
    }

    @Override
    @Transactional
    public UserCourseChapterCompleted completeChapter(ChapterCompleteDTO completeDTO) {
        Integer userId = UserContext.getUserId();
        Integer courseId = completeDTO.getCourseId();
        Integer chapterId = completeDTO.getChapterId();

        // 1. 关键逻辑：必须先查 Enrollment 表，获取 enrollmentId
        UserCourseEnrollment enrollment = enrollmentRepository.findByUserIdAndCourseId(userId, courseId);
        if (enrollment == null) {
            throw new BizException(ResultCodes.NOTFOUND);
        }

        // 2. 检查该章节是否已经打过卡
        boolean isCompleted = completedRepository.existsByEnrollmentIdAndChapterId(enrollment.getEnrollmentId(), chapterId);
        if (isCompleted) {
            throw new BizException(ResultCodes.NOTFOUND);
        }

        // 3. 保存打卡记录
        UserCourseChapterCompleted completed = new UserCourseChapterCompleted();
        completed.setEnrollmentId(enrollment.getEnrollmentId()); // 关联到报名记录ID
        completed.setChapterId(chapterId);
        return completedRepository.save(completed);
    }

    @Override
    public List<UserCourseEnrollment> queryMyCourses() {
        Integer userId = UserContext.getUserId();
        return enrollmentRepository.findAllByUserId(userId);
    }
}