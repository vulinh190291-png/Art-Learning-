package org.hyjava.hyall.module.chapter.service;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.chapter.pojo.Chapter;
import org.hyjava.hyall.module.chapter.pojo.dto.ChapterDTO;
import org.springframework.stereotype.Service;

@Service
public interface IChapterService {
    public Chapter queryChapter(Integer chapterId);
    public void deleteChapter(Integer chapterId);
    public Chapter updateChapter(ChapterDTO Chapter);
    public Chapter addChapter(ChapterDTO chapter);
}
