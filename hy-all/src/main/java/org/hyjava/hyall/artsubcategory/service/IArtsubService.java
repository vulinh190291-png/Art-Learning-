package org.hyjava.hyall.artsubcategory.service;

import org.hyjava.hyall.artsubcategory.pojo.Artsubcategory;
import org.hyjava.hyall.artsubcategory.pojo.dto.ArtsubcategoryDTO;
import org.springframework.stereotype.Service;

@Service
public interface IArtsubService {
    public Artsubcategory addArtSub(ArtsubcategoryDTO artSubCategory);
    public Artsubcategory updateArtSub(ArtsubcategoryDTO artSubCategory);
    public void deleteArtSub(Integer id);
    public Artsubcategory queryArtSub(Integer id);
}
