package org.hyjava.hyall.module.artsubcategory.controller;

import org.hyjava.hyall.module.artsubcategory.pojo.ResponseMessage;
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
    public ResponseMessage<Artsubcategory> addArtSub(@RequestBody ArtsubcategoryDTO artSubCategory) {
        Artsubcategory nartSub = artSubService.addArtSub(artSubCategory);
        return ResponseMessage.success(nartSub);
    }

    @DeleteMapping
    public ResponseMessage<Artsubcategory> delArtSub(@RequestBody Integer artsubId) {
        artSubService.deleteArtSub(artsubId);
        return ResponseMessage.success(null);
    }

    @GetMapping
    public ResponseMessage<Artsubcategory> queryArtSub(@RequestBody Integer id) {
        return ResponseMessage.success(artSubService.queryArtSub(id));
    }

    @PutMapping
    public ResponseMessage<Artsubcategory> updateArtSub(@RequestBody ArtsubcategoryDTO artSubCategory) {
        Artsubcategory artSub = artSubService.updateArtSub(artSubCategory);
        return ResponseMessage.success(artSub);
    }
}
