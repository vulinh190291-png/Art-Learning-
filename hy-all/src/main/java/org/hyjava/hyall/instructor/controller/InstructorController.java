package org.hyjava.hyall.instructor.controller;

import org.hyjava.hyall.address.pojo.ResponseMessage;
import org.hyjava.hyall.instructor.pojo.Instructor;
import org.hyjava.hyall.instructor.pojo.dto.InstructorDTO;
import org.hyjava.hyall.instructor.service.InstructorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/instructor")
public class InstructorController {
    @Autowired
    InstructorService instructorService;

    @PostMapping
    public ResponseMessage<Instructor> addInstructor(@RequestBody InstructorDTO instructor) {
        Instructor ninstructor = instructorService.addInstructor(instructor);
        return ResponseMessage.success(ninstructor);
    }

    @DeleteMapping
    public ResponseMessage<Instructor> deleteInstructor(@RequestBody Integer instructorId) {
        instructorService.deleteInstructor(instructorId);
        return ResponseMessage.success(null);
    }

    @PutMapping
    public ResponseMessage<Instructor> updateInstructor(@RequestBody InstructorDTO instructor) {
        Instructor ninstrutor = instructorService.updateInstructor(instructor);
        return ResponseMessage.success(ninstrutor);
    }

    @GetMapping
    public ResponseMessage<Instructor> queryInstructor(@RequestBody  Integer instructorId) {
        return ResponseMessage.success(instructorService.queryInstructor(instructorId));
    }
}
