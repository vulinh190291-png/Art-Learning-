package org.hyjava.hyall.module.artcategory.controller;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.artcategory.pojo.Artcategory;
import org.hyjava.hyall.module.artcategory.pojo.dto.ArtcategoryDTO;
import org.hyjava.hyall.module.artcategory.service.IArtcategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/artcate")
public class ArtcategoryController {
    @Autowired
    IArtcategoryService artCateService;

    @PostMapping
    public Result<Artcategory> addCate(@RequestBody @Validated ArtcategoryDTO artcategory) {
        Artcategory nartcategory = artCateService.addCate(artcategory);
        return Result.success(nartcategory);
    }

    @PutMapping
    public Result<Artcategory> updateCate(@RequestBody @Validated ArtcategoryDTO artcategory) {
        Artcategory nartcategory = artCateService.updateCate(artcategory);
        return Result.success(nartcategory);
    }

    @DeleteMapping
    public Result<Artcategory> deleteCate(@RequestBody Integer id) {
        artCateService.deleteCate(id);
        return Result.success(null);
    }

    @GetMapping
    public Result<Artcategory> getCate(@RequestBody Integer cateId) {
        Artcategory nartCategory = artCateService.queryCate(cateId);
        return Result.success(nartCategory);
    }
}
