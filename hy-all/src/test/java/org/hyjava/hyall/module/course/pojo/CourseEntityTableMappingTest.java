package org.hyjava.hyall.module.course.pojo;

import jakarta.persistence.Table;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CourseEntityTableMappingTest {

    @Test
    void enrollmentAndCompletionShouldUseDifferentTables() {
        Table enrollmentTable =
                UserCourseEnrollment.class.getAnnotation(Table.class);

        Table completionTable =
                UserCourseChapterCompleted.class.getAnnotation(Table.class);

        assertEquals(
                "user_course_enrollment",
                enrollmentTable.name()
        );

        assertEquals(
                "user_course_chapter_completed",
                completionTable.name()
        );
    }
}