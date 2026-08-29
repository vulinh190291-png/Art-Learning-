package org.hyjava.hyall.module.course.service;

import org.hyjava.hyall.common.auth.UserContext;
import org.hyjava.hyall.common.core.resultcode.ResultCodes;
import org.hyjava.hyall.common.exception.BizException;
import org.hyjava.hyall.module.course.pojo.UserCourseChapterCompleted;
import org.hyjava.hyall.module.course.pojo.CourseLearningStatus;
import org.hyjava.hyall.module.course.pojo.UserCourseEnrollment;
import org.hyjava.hyall.module.course.pojo.dto.ChapterCompleteDTO;
import org.hyjava.hyall.module.course.pojo.dto.EnrollRequestDTO;
import org.hyjava.hyall.module.course.repository.UserCourseChapterCompletedRepository;
import org.hyjava.hyall.module.course.repository.UserCourseEnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.hyjava.hyall.module.chapter.repository.ChapterRepository;

import java.util.Date;
import java.util.List;

@Service
public class CourseEnrollmentService implements ICourseEnrollmentService {

    @Autowired
    UserCourseEnrollmentRepository enrollmentRepository;

    @Autowired
    UserCourseChapterCompletedRepository completedRepository;

    @Autowired
    ChapterRepository chapterRepository;

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

        // 学习进度从 0 开始
        enrollment.setProgress(0);

        // 刚报名，还没有开始完成章节
        enrollment.setStatus(CourseLearningStatus.NOT_STARTED);

        // 默认没有获得证书
        enrollment.setCertificateAwarded(false);

        return enrollmentRepository.save(enrollment);
    }

    @Override
    @Transactional
    public UserCourseChapterCompleted completeChapter(ChapterCompleteDTO completeDTO) {

        Integer userId = UserContext.getUserId();
        Integer courseId = completeDTO.getCourseId();
        Integer chapterId = completeDTO.getChapterId();

        // 1. 检查用户是否报名课程
        UserCourseEnrollment enrollment = enrollmentRepository.findByUserIdAndCourseId(userId, courseId);

        if (enrollment == null) {
            throw new BizException(ResultCodes.NOTFOUND);
        }

        // 2. 检查章节是否属于当前课程
        boolean chapterExists = chapterRepository.existsByChapterIdAndCourseId(chapterId, courseId);

        if (!chapterExists) {
            throw new BizException(ResultCodes.NOTFOUND);
        }

        // 3. 幂等检查
        boolean alreadyCompleted = completedRepository.existsByEnrollmentIdAndChapterId(enrollment.getEnrollmentId(), chapterId);

        if (alreadyCompleted) {
            throw new BizException(ResultCodes.OVERTIME);
        }

        // 4. 保存章节完成记录
        UserCourseChapterCompleted completed =
                new UserCourseChapterCompleted();

        completed.setEnrollmentId(
                enrollment.getEnrollmentId()
        );

        completed.setChapterId(chapterId);

        completedRepository.save(completed);

        // 5. 查询课程总章节数量
        long totalChapters =
                chapterRepository
                        .countByCourseId(courseId);

        if (totalChapters == 0) {
            throw new BizException(ResultCodes.NOTFOUND);
        }

        // 6. 查询已经完成的章节数量
        long completedChapters = completedRepository.countByEnrollmentId(enrollment.getEnrollmentId());

        // 7. 计算学习进度
        int progress =
                (int) (completedChapters * 100 / totalChapters);

        enrollment.setProgress(progress);

        // 8. 更新学习状态
        if (progress >= 100) {

            enrollment.setProgress(100);

            enrollment.setStatus(CourseLearningStatus.COMPLETED);

            enrollment.setCompletedAt(new Date());

        } else {

            enrollment.setStatus(
                    CourseLearningStatus.IN_PROGRESS
            );
        }

        // 9. 保存课程学习状态
        enrollmentRepository.save(enrollment);

        return completed;
    }

    @Override
    public List<UserCourseEnrollment> queryMyCourses() {
        Integer userId = UserContext.getUserId();
        return enrollmentRepository.findAllByUserId(userId);
    }
}