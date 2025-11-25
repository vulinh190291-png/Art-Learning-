package org.hyjava.hyall.module.chapter.repository;

import org.hyjava.hyall.module.chapter.pojo.Chapter;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChapterRepository extends CrudRepository<Chapter,Integer> {
}
