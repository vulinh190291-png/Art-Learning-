package org.hyjava.hyall.module.course.repository;
import org.hyjava.hyall.common.core.result.Result;


import org.hyjava.hyall.module.course.pojo.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course,Integer> {
}
