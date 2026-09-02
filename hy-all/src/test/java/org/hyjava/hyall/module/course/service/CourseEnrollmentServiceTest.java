package org.hyjava.hyall.module.course.service;

import org.hyjava.hyall.common.exception.BizException;
import org.hyjava.hyall.common.auth.UserContext;
import org.hyjava.hyall.module.chapter.repository.ChapterRepository;
import org.hyjava.hyall.module.course.pojo.CourseLearningStatus;
import org.hyjava.hyall.module.course.pojo.UserCourseChapterCompleted;
import org.hyjava.hyall.module.course.pojo.UserCourseEnrollment;
import org.hyjava.hyall.module.course.pojo.dto.ChapterCompleteDTO;
import org.hyjava.hyall.module.course.repository.UserCourseChapterCompletedRepository;
import org.hyjava.hyall.module.course.repository.UserCourseEnrollmentRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CourseEnrollmentServiceTest {

    @Mock
    private UserCourseEnrollmentRepository enrollmentRepository;

    @Mock
    private UserCourseChapterCompletedRepository completedRepository;

    @Mock
    private ChapterRepository chapterRepository;

    @InjectMocks
    private CourseEnrollmentService courseEnrollmentService;

    @BeforeEach
    void setUp() {
        // 模拟当前登录用户
        UserContext.setUserId(3);
    }

    @AfterEach
    void tearDown() {
        // 避免当前测试的用户信息影响其他测试
        UserContext.setUserId(null);
    }

    @Test
    void completeFirstChapterShouldUpdateProgressToFiftyPercent() {
        // 1. 准备报名记录
        UserCourseEnrollment enrollment = new UserCourseEnrollment();
        enrollment.setEnrollmentId(1);
        enrollment.setUserId(3);
        enrollment.setCourseId(9001);
        enrollment.setProgress(0);
        enrollment.setStatus(CourseLearningStatus.NOT_STARTED);

        // 2. 准备接口参数
        ChapterCompleteDTO completeDTO = new ChapterCompleteDTO();
        completeDTO.setCourseId(9001);
        completeDTO.setChapterId(9101);

        // 3. 模拟数据库查询结果
        when(enrollmentRepository.findByUserIdAndCourseId(3, 9001))
                .thenReturn(enrollment);

        when(chapterRepository.existsByChapterIdAndCourseId(9101, 9001))
                .thenReturn(true);

        when(completedRepository.existsByEnrollmentIdAndChapterId(1, 9101))
                .thenReturn(false);

        when(chapterRepository.countByCourseId(9001))
                .thenReturn(2L);

        when(completedRepository.countByEnrollmentId(1))
                .thenReturn(1L);

        // 4. 调用真实业务方法
        UserCourseChapterCompleted result =
                courseEnrollmentService.completeChapter(completeDTO);

        // 5. 验证真实业务结果
        assertNotNull(result);
        assertEquals(1, result.getEnrollmentId());
        assertEquals(9101, result.getChapterId());

        assertEquals(50, enrollment.getProgress());
        assertEquals(
                CourseLearningStatus.IN_PROGRESS,
                enrollment.getStatus()
        );
        assertNull(enrollment.getCompletedAt());

        // 6. 验证完成记录和报名状态被保存
        verify(completedRepository)
                .save(any(UserCourseChapterCompleted.class));

        verify(enrollmentRepository)
                .save(enrollment);
    }

    @Test
    void completeLastChapterShouldUpdateCourseToCompleted() {
        // 1. 准备已经完成第一章的报名记录
        UserCourseEnrollment enrollment = new UserCourseEnrollment();
        enrollment.setEnrollmentId(1);
        enrollment.setUserId(3);
        enrollment.setCourseId(9001);
        enrollment.setProgress(50);
        enrollment.setStatus(CourseLearningStatus.IN_PROGRESS);

        // 2. 准备完成第二章的参数
        ChapterCompleteDTO completeDTO = new ChapterCompleteDTO();
        completeDTO.setCourseId(9001);
        completeDTO.setChapterId(9102);

        // 3. 模拟数据库查询
        when(enrollmentRepository.findByUserIdAndCourseId(3, 9001))
                .thenReturn(enrollment);

        when(chapterRepository.existsByChapterIdAndCourseId(9102, 9001))
                .thenReturn(true);

        when(completedRepository.existsByEnrollmentIdAndChapterId(1, 9102))
                .thenReturn(false);

        // 课程共两章，完成记录已经达到两条
        when(chapterRepository.countByCourseId(9001))
                .thenReturn(2L);

        when(completedRepository.countByEnrollmentId(1))
                .thenReturn(2L);

        // 4. 调用真实业务方法
        UserCourseChapterCompleted result =
                courseEnrollmentService.completeChapter(completeDTO);

        // 5. 验证章节完成记录
        assertNotNull(result);
        assertEquals(1, result.getEnrollmentId());
        assertEquals(9102, result.getChapterId());

        // 6. 验证课程最终状态
        assertEquals(100, enrollment.getProgress());
        assertEquals(
                CourseLearningStatus.COMPLETED,
                enrollment.getStatus()
        );
        assertNotNull(enrollment.getCompletedAt());

        // 7. 验证保存操作
        verify(completedRepository)
                .save(any(UserCourseChapterCompleted.class));

        verify(enrollmentRepository)
                .save(enrollment);
    }

    @Test
    void completeSameChapterTwiceShouldRejectDuplicateRequest() {
        // 1. 准备已经完成课程的报名记录
        UserCourseEnrollment enrollment = new UserCourseEnrollment();
        enrollment.setEnrollmentId(1);
        enrollment.setUserId(3);
        enrollment.setCourseId(9001);
        enrollment.setProgress(100);
        enrollment.setStatus(CourseLearningStatus.COMPLETED);

        // 2. 再次提交已经完成的第二章
        ChapterCompleteDTO completeDTO = new ChapterCompleteDTO();
        completeDTO.setCourseId(9001);
        completeDTO.setChapterId(9102);

        // 3. 模拟数据库状态
        when(enrollmentRepository.findByUserIdAndCourseId(3, 9001))
                .thenReturn(enrollment);

        when(chapterRepository.existsByChapterIdAndCourseId(9102, 9001))
                .thenReturn(true);

        // 该章节已经完成
        when(completedRepository.existsByEnrollmentIdAndChapterId(1, 9102))
                .thenReturn(true);

        // 4. 验证重复请求会抛出业务异常
        assertThrows(
                BizException.class,
                () -> courseEnrollmentService.completeChapter(completeDTO)
        );

        // 5. 原有学习状态不能被改变
        assertEquals(100, enrollment.getProgress());
        assertEquals(
                CourseLearningStatus.COMPLETED,
                enrollment.getStatus()
        );

        // 6. 重复请求不能继续执行统计和保存
        verify(chapterRepository, never())
                .countByCourseId(anyInt());

        verify(completedRepository, never())
                .countByEnrollmentId(anyInt());

        verify(completedRepository, never())
                .save(any(UserCourseChapterCompleted.class));

        verify(enrollmentRepository, never())
                .save(any(UserCourseEnrollment.class));
    }

    @Test
    void chapterOutsideCourseShouldBeRejectedWithoutSavingData() {
        // 1. 用户已经报名课程 9001
        UserCourseEnrollment enrollment = new UserCourseEnrollment();
        enrollment.setEnrollmentId(1);
        enrollment.setUserId(3);
        enrollment.setCourseId(9001);
        enrollment.setProgress(50);
        enrollment.setStatus(CourseLearningStatus.IN_PROGRESS);

        // 2. 章节 9999 不属于课程 9001
        ChapterCompleteDTO completeDTO = new ChapterCompleteDTO();
        completeDTO.setCourseId(9001);
        completeDTO.setChapterId(9999);

        when(enrollmentRepository.findByUserIdAndCourseId(3, 9001))
                .thenReturn(enrollment);

        when(chapterRepository.existsByChapterIdAndCourseId(9999, 9001))
                .thenReturn(false);

        // 3. 应当抛出业务异常
        assertThrows(
                BizException.class,
                () -> courseEnrollmentService.completeChapter(completeDTO)
        );

        // 4. 原来的学习状态不能变化
        assertEquals(50, enrollment.getProgress());
        assertEquals(
                CourseLearningStatus.IN_PROGRESS,
                enrollment.getStatus()
        );
        assertNull(enrollment.getCompletedAt());

        // 5. 章节无效后，不应继续检查完成记录
        verifyNoInteractions(completedRepository);

        // 6. 不应计算章节总数，也不应保存报名状态
        verify(chapterRepository, never())
                .countByCourseId(anyInt());

        verify(enrollmentRepository, never())
                .save(any(UserCourseEnrollment.class));
    }

    @Test
    void userWithoutEnrollmentShouldBeRejectedImmediately() {
        // 1. 用户尝试完成未报名课程的章节
        ChapterCompleteDTO completeDTO = new ChapterCompleteDTO();
        completeDTO.setCourseId(9002);
        completeDTO.setChapterId(9201);

        // 2. 数据库中不存在该用户的报名记录
        when(enrollmentRepository.findByUserIdAndCourseId(3, 9002))
                .thenReturn(null);

        // 3. 应当立即抛出业务异常
        assertThrows(
                BizException.class,
                () -> courseEnrollmentService.completeChapter(completeDTO)
        );

        // 4. 没有报名时，不应该继续查询章节和完成记录
        verifyNoInteractions(chapterRepository);
        verifyNoInteractions(completedRepository);

        // 5. 不能创建或修改报名记录
        verify(enrollmentRepository, never())
                .save(any(UserCourseEnrollment.class));
    }
}