package org.hyjava.hyall.module.artsubcategory.controller;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.artsubcategory.pojo.Artsubcategory;
import org.hyjava.hyall.module.artsubcategory.pojo.dto.ArtsubcategoryDTO;
import org.hyjava.hyall.module.artsubcategory.service.ArtsubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/artsub")
public class ArtsubController {
    @Autowired
    ArtsubService artSubService;

    @PostMapping
    public Result<Artsubcategory> addArtSub(@RequestBody ArtsubcategoryDTO artSubCategory) {
        Artsubcategory nartSub = artSubService.addArtSub(artSubCategory);
        return Result.success(nartSub);
    }

    @DeleteMapping
    public Result<Artsubcategory> delArtSub(@RequestBody Integer artsubId) {
        artSubService.deleteArtSub(artsubId);
        return Result.success(null);
    }

    @GetMapping
    public Result<Artsubcategory> queryArtSub(@RequestBody Integer id) {
        return Result.success(artSubService.queryArtSub(id));
    }

    @PutMapping
    public Result<Artsubcategory> updateArtSub(@RequestBody ArtsubcategoryDTO artSubCategory) {
        Artsubcategory artSub = artSubService.updateArtSub(artSubCategory);
        return Result.success(artSub);
    }
}
