package org.hyjava.hyall.module.instructor.service;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.instructor.pojo.Instructor;
import org.hyjava.hyall.module.instructor.pojo.dto.InstructorDTO;
import org.springframework.stereotype.Service;

@Service
public interface IInstructorService {
    public Instructor addInstructor(InstructorDTO instructor);
    public Instructor updateInstructor(InstructorDTO instructor);
    public void deleteInstructor(Integer UserId);
    public Instructor queryInstructor(Integer UserId);
}
