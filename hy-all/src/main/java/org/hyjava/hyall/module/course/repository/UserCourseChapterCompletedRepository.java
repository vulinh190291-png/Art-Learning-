package org.hyjava.hyall.module.course.repository;

import org.hyjava.hyall.module.course.pojo.UserCourseChapterCompleted;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserCourseChapterCompletedRepository extends JpaRepository<UserCourseChapterCompleted, Integer> {
    // 检查某次报名记录下，某章是否已完成（防止重复打卡）
    boolean existsByEnrollmentIdAndChapterId(Integer enrollmentId, Integer chapterId);

    // 查询某次报名的所有完成记录（用于计算进度）
    List<UserCourseChapterCompleted> findAllByEnrollmentId(Integer enrollmentId);
}