package org.hyjava.hyall.chapter.service;

import org.hyjava.hyall.chapter.pojo.Chapter;
import org.hyjava.hyall.chapter.pojo.dto.ChapterDTO;
import org.springframework.stereotype.Service;

@Service
public interface IChapterService {
    public Chapter queryChapter(Integer chapterId);
    public void deleteChapter(Integer chapterId);
    public Chapter updateChapter(ChapterDTO Chapter);
    public Chapter addChapter(ChapterDTO chapter);
}
