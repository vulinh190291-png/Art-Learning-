package org.hyjava.hyall.module.course.repository;

import org.hyjava.hyall.module.course.pojo.UserCourseEnrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserCourseEnrollmentRepository extends JpaRepository<UserCourseEnrollment, Integer> {
    // 核心方法：检查用户有没有买过这门课
    UserCourseEnrollment findByUserIdAndCourseId(Integer userId, Integer courseId);

    // 查询我的所有课程
    List<UserCourseEnrollment> findAllByUserId(Integer userId);
}