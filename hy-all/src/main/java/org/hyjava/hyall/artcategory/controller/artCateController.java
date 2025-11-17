package org.hyjava.hyall.artcategory.controller;

import org.hyjava.hyall.artcategory.pojo.ResponseMessage;
import org.hyjava.hyall.artcategory.pojo.artCategory;
import org.hyjava.hyall.artcategory.pojo.dto.artCategoryDTO;
import org.hyjava.hyall.artcategory.service.IartCateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/artcate")
public class artCateController {
    @Autowired
    IartCateService artCateService;

    @PostMapping
    public ResponseMessage<artCategory> addCate(@RequestBody @Validated artCategoryDTO artcategory) {
        artCategory nartcategory = artCateService.addCate(artcategory);
        return ResponseMessage.success(nartcategory);
    }

    @PutMapping
    public ResponseMessage<artCategory> updateCate(@RequestBody @Validated artCategoryDTO artcategory) {
        artCategory nartcategory = artCateService.updateCate(artcategory);
        return ResponseMessage.success(nartcategory);
    }

    @DeleteMapping
    public ResponseMessage<artCategory> deleteCate(@RequestBody Integer id) {
        artCateService.deleteCate(id);
        return ResponseMessage.success(null);
    }

    @GetMapping
    public ResponseMessage<artCategory> getCate(@RequestBody Integer cateId) {
        artCategory nartCategory = artCateService.queryCate(cateId);
        return ResponseMessage.success(nartCategory);
    }
}
