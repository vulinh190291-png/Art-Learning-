package org.hyjava.hyall.module.course.repository;


import org.hyjava.hyall.module.course.pojo.Course;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends CrudRepository<Course,Integer> {
}
