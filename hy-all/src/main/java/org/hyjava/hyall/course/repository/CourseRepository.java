package org.hyjava.hyall.course.repository;


import org.hyjava.hyall.course.pojo.Course;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends CrudRepository<Course,Integer> {
}
