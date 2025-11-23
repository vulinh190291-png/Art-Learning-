package org.hyjava.hyall.chapter.repository;

import org.hyjava.hyall.chapter.pojo.Chapter;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChapterRepository extends CrudRepository<Chapter,Integer> {
}
