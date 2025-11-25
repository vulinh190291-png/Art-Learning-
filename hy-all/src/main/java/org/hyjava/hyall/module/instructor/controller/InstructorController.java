package org.hyjava.hyall.module.instructor.controller;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.instructor.pojo.Instructor;
import org.hyjava.hyall.module.instructor.pojo.dto.InstructorDTO;
import org.hyjava.hyall.module.instructor.service.InstructorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/instructor")
public class InstructorController {
    @Autowired
    InstructorService instructorService;

    @PostMapping
    public Result<Instructor> addInstructor(@RequestBody InstructorDTO instructor) {
        Instructor ninstructor = instructorService.addInstructor(instructor);
        return Result.success(ninstructor);
    }

    @DeleteMapping
    public Result<Instructor> deleteInstructor(@RequestBody Integer instructorId) {
        instructorService.deleteInstructor(instructorId);
        return Result.success(null);
    }

    @PutMapping
    public Result<Instructor> updateInstructor(@RequestBody InstructorDTO instructor) {
        Instructor ninstrutor = instructorService.updateInstructor(instructor);
        return Result.success(ninstrutor);
    }

    @GetMapping
    public Result<Instructor> queryInstructor(@RequestBody  Integer instructorId) {
        return Result.success(instructorService.queryInstructor(instructorId));
    }
}
