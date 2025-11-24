package org.hyjava.hyall.artcategory.service;

import org.hyjava.hyall.artcategory.pojo.Artcategory;
import org.hyjava.hyall.artcategory.pojo.dto.ArtcategoryDTO;

public interface IArtcategoryService {
    public Artcategory addCate(ArtcategoryDTO artcategory);
    public Artcategory updateCate(ArtcategoryDTO artcategory);
    public void deleteCate(Integer cateId);
    public Artcategory queryCate(Integer cateId);
}
