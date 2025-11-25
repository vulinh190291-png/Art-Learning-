package org.hyjava.hyall.module.collection.controller;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.collection.pojo.Collection;
import org.hyjava.hyall.module.collection.pojo.dto.CollectionDTO;
import org.hyjava.hyall.module.collection.service.ICollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/collection")
public class CollectionController {
    @Autowired
    ICollectionService collectionService;
    @PostMapping
    public Result<Collection> addCollection(@RequestBody @Validated CollectionDTO collection){
        Collection ncollection = collectionService.addCollection(collection);
        return Result.success(ncollection);
    }
    @DeleteMapping
    public void deleteCollection(@RequestBody Integer collectionId){
        collectionService.deleteCollection(collectionId);
    }
    @PutMapping
    public Result<Collection> updateCollection(@RequestBody @Validated CollectionDTO collection){
        Collection ncollection = collectionService.updateCollection(collection);
        return Result.success(ncollection);
    }

    @GetMapping
    public Result<Collection> queryCollection(@RequestParam Integer collectionId){
        Collection ncollection = collectionService.queryCollection(collectionId);
        return Result.success(ncollection);
    }
}
