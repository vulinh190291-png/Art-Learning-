package org.hyjava.hyall.chapter.controller;

import org.hyjava.hyall.chapter.pojo.Chapter;
import org.hyjava.hyall.chapter.pojo.dto.ChapterDTO;
import org.hyjava.hyall.chapter.service.IChapterService;
import org.hyjava.hyall.post.pojo.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chapter")
public class ChapterController {
    @Autowired
    IChapterService  chapterService;
    @PostMapping
    public ResponseMessage<Chapter> addChapter(@RequestBody @Validated ChapterDTO chapter){
        Chapter nchapter = chapterService.addChapter(chapter);
        return ResponseMessage.success(nchapter);
    }

    @DeleteMapping
    public void deleteChapter(@RequestBody Integer chapterId){ chapterService.deleteChapter(chapterId);}


    @PutMapping
    public ResponseMessage<Chapter> updateChapter(@RequestBody @Validated ChapterDTO chapter){
        Chapter nchapter = chapterService.updateChapter(chapter);
        return ResponseMessage.success(nchapter);
    }

    @GetMapping
    public ResponseMessage<Chapter> queryChapter(@RequestBody  Integer chapterId){
        Chapter nchapter = chapterService.queryChapter(chapterId);
        return ResponseMessage.success(nchapter);
    }
}