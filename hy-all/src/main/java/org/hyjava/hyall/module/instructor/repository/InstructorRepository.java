package org.hyjava.hyall.module.instructor.repository;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.instructor.pojo.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstructorRepository extends JpaRepository<Instructor,Integer> {
}
