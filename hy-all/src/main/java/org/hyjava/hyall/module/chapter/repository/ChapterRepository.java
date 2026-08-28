package org.hyjava.hyall.module.chapter.repository;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.chapter.pojo.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter,Integer> {

    long countByCourseId(Integer courseId);

    //判断“章节是否真的属于这门课”
    boolean existsByChapterIdAndCourseId(
            Integer chapterId,
            Integer courseId
    );
}
