package org.hyjava.hyall.module.artsubcategory.service;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.artsubcategory.pojo.dto.ArtsubcategoryDTO;
import org.hyjava.hyall.module.artsubcategory.repository.ArtsubRepository;
import org.hyjava.hyall.module.artsubcategory.pojo.Artsubcategory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArtsubService implements IArtsubService {
    @Autowired
    private ArtsubRepository artSubRepository;

    @Override
    public Artsubcategory addArtSub(ArtsubcategoryDTO artSubCategory) {
        Artsubcategory artsub = new Artsubcategory();
        BeanUtils.copyProperties(artSubCategory,artsub);
        return artsub;
    }

    @Override
    public Artsubcategory updateArtSub(ArtsubcategoryDTO artsub) {
        Integer artsubId = artsub.getSubCateId();
        Artsubcategory nartsub = artSubRepository.findById(artsubId).orElseThrow(() -> new RuntimeException("没这个" + artsubId));
        BeanUtils.copyProperties(artsub,artsub);
        return nartsub;
    }

    @Override
    public void deleteArtSub(Integer artsubId) {
        artSubRepository.deleteById(artsubId);
    }

    @Override
    public Artsubcategory queryArtSub(Integer artsubId) {
        return artSubRepository.findById(artsubId).orElseThrow(() -> new RuntimeException("没这个ID" + artsubId));
    }
}
