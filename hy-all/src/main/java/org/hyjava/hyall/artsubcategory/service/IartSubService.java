package org.hyjava.hyall.artsubcategory.service;

import org.hyjava.hyall.artsubcategory.pojo.artSubCategory;
import org.hyjava.hyall.artsubcategory.pojo.dto.artSubCategoryDTO;
import org.springframework.stereotype.Service;

@Service
public interface IartSubService {
    public artSubCategory addArtSub(artSubCategoryDTO artSubCategory);
    public artSubCategory updateArtSub(artSubCategoryDTO artSubCategory);
    public void deleteArtSub(Integer id);
    public artSubCategory queryArtSub(Integer id);
}
