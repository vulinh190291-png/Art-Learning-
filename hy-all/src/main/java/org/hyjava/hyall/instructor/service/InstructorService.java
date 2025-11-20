package org.hyjava.hyall.instructor.service;

import org.hyjava.hyall.instructor.pojo.Instructor;
import org.hyjava.hyall.instructor.pojo.dto.InstructorDTO;
import org.hyjava.hyall.instructor.repository.InstructorRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InstructorService implements IInstructorService {
    @Autowired
    InstructorRepository instructorRepository;

    @Override
    public Instructor addInstructor(InstructorDTO instructor) {
         Instructor ninstructor = new Instructor();
         BeanUtils.copyProperties(instructor,ninstructor);
         return instructorRepository.save(ninstructor);
    }

    @Override
    public Instructor updateInstructor(InstructorDTO instructor) {
        Integer instructorId = instructor.getId();
        Instructor ninstructor = instructorRepository.findById(instructorId).orElseThrow(() -> new RuntimeException("检查id" + instructorId));
        BeanUtils.copyProperties(instructor,ninstructor);
        return instructorRepository.save(ninstructor);
    }

    @Override
    public void deleteInstructor(Integer instructorId) {
        instructorRepository.deleteById(instructorId);
    }

    @Override
    public Instructor queryInstructor(Integer instructorId) {
        return instructorRepository.findById(instructorId).get();
    }
}
