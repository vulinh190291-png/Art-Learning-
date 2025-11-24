package org.hyjava.hyall.artcategory.controller;

import org.hyjava.hyall.artcategory.pojo.ResponseMessage;
import org.hyjava.hyall.artcategory.pojo.Artcategory;
import org.hyjava.hyall.artcategory.pojo.dto.ArtcategoryDTO;
import org.hyjava.hyall.artcategory.service.IArtcategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/artcate")
public class ArtcategoryController {
    @Autowired
    IArtcategoryService artCateService;

    @PostMapping
    public ResponseMessage<Artcategory> addCate(@RequestBody @Validated ArtcategoryDTO artcategory) {
        Artcategory nartcategory = artCateService.addCate(artcategory);
        return ResponseMessage.success(nartcategory);
    }

    @PutMapping
    public ResponseMessage<Artcategory> updateCate(@RequestBody @Validated ArtcategoryDTO artcategory) {
        Artcategory nartcategory = artCateService.updateCate(artcategory);
        return ResponseMessage.success(nartcategory);
    }

    @DeleteMapping
    public ResponseMessage<Artcategory> deleteCate(@RequestBody Integer id) {
        artCateService.deleteCate(id);
        return ResponseMessage.success(null);
    }

    @GetMapping
    public ResponseMessage<Artcategory> getCate(@RequestBody Integer cateId) {
        Artcategory nartCategory = artCateService.queryCate(cateId);
        return ResponseMessage.success(nartCategory);
    }
}
