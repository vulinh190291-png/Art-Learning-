package org.hyjava.hyall.artcategory.service;

import org.hyjava.hyall.artcategory.pojo.artCategory;
import org.hyjava.hyall.artcategory.pojo.dto.artCategoryDTO;

public interface IartCateService {
    public artCategory addCate(artCategoryDTO artcategory);
    public artCategory updateCate(artCategoryDTO artcategory);
    public void deleteCate(Integer cateId);
    public artCategory queryCate(Integer cateId);
}
