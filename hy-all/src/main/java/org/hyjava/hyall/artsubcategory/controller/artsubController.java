package org.hyjava.hyall.artsubcategory.controller;

import org.hyjava.hyall.artsubcategory.pojo.ResponseMessage;
import org.hyjava.hyall.artsubcategory.pojo.artSubCategory;
import org.hyjava.hyall.artsubcategory.pojo.dto.artSubCategoryDTO;
import org.hyjava.hyall.artsubcategory.service.artSubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/artsub")
public class artsubController {
    @Autowired
    artSubService artSubService;

    @PostMapping
    public ResponseMessage<artSubCategory> addArtSub(@RequestBody artSubCategoryDTO artSubCategory) {
        artSubCategory nartSub = artSubService.addArtSub(artSubCategory);
        return ResponseMessage.success(nartSub);
    }

    @DeleteMapping
    public ResponseMessage<artSubCategory> delArtSub(@RequestBody Integer artsubId) {
        artSubService.deleteArtSub(artsubId);
        return ResponseMessage.success(null);
    }

    @GetMapping
    public ResponseMessage<artSubCategory> queryArtSub(@RequestBody Integer id) {
        return ResponseMessage.success(artSubService.queryArtSub(id));
    }

    @PutMapping
    public ResponseMessage<artSubCategory> updateArtSub(@RequestBody artSubCategoryDTO artSubCategory) {
        artSubCategory artSub = artSubService.updateArtSub(artSubCategory);
        return ResponseMessage.success(artSub);
    }
}
