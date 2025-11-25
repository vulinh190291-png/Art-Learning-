package org.hyjava.hyall.module.chapter.service;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.chapter.pojo.Chapter;
import org.hyjava.hyall.module.chapter.pojo.dto.ChapterDTO;
import org.springframework.beans.BeanUtils;
import org.hyjava.hyall.module.chapter.repository.ChapterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChapterService implements IChapterService {
    @Autowired
    ChapterRepository chapterRepository;
    @Override
    public Chapter addChapter(ChapterDTO chapter) {
        Chapter nChapter = new Chapter();
        BeanUtils.copyProperties(chapter,nChapter);
        return chapterRepository.save(nChapter);
    }

    @Override
    public void deleteChapter(Integer chapterId) { chapterRepository.deleteById(chapterId);}

    @Override
    public Chapter updateChapter(ChapterDTO Chapter) {
        Integer chapterId = Chapter.getChapterId();
        Chapter nChapter = chapterRepository.findById(chapterId).orElseThrow(()->new RuntimeException("要更新的章节不存在,ID:"+chapterId));
        BeanUtils.copyProperties(Chapter,nChapter);
        return chapterRepository.save(nChapter);
    }

    @Override
    public Chapter queryChapter(Integer chapterId) { return chapterRepository.findById(chapterId)
            .orElseThrow(() -> new RuntimeException("章节不存在,ID:" + chapterId)); }
}
