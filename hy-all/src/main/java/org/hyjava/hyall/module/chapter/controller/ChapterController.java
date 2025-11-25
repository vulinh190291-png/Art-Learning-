package org.hyjava.hyall.module.chapter.controller;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.chapter.pojo.Chapter;
import org.hyjava.hyall.module.chapter.pojo.dto.ChapterDTO;
import org.hyjava.hyall.module.chapter.service.IChapterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chapter")
public class ChapterController {
    @Autowired
    IChapterService  chapterService;
    @PostMapping
    public Result<Chapter> addChapter(@RequestBody @Validated ChapterDTO chapter){
        Chapter nchapter = chapterService.addChapter(chapter);
        return Result.success(nchapter);
    }

    @DeleteMapping
    public void deleteChapter(@RequestBody Integer chapterId){ chapterService.deleteChapter(chapterId);}


    @PutMapping
    public Result<Chapter> updateChapter(@RequestBody @Validated ChapterDTO chapter){
        Chapter nchapter = chapterService.updateChapter(chapter);
        return Result.success(nchapter);
    }

    @GetMapping
    public Result<Chapter> queryChapter(@RequestBody  Integer chapterId){
        Chapter nchapter = chapterService.queryChapter(chapterId);
        return Result.success(nchapter);
    }
}