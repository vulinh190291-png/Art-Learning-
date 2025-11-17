package org.hyjava.hyall.artsubcategory.service;

import org.hyjava.hyall.artsubcategory.pojo.dto.artSubCategoryDTO;
import org.hyjava.hyall.artsubcategory.repository.artSubRepository;
import org.hyjava.hyall.artsubcategory.pojo.artSubCategory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class artSubService implements IartSubService {
    @Autowired
    private artSubRepository artSubRepository;

    @Override
    public artSubCategory addArtSub(artSubCategoryDTO artSubCategory) {
        artSubCategory artsub = new artSubCategory();
        BeanUtils.copyProperties(artSubCategory,artsub);
        return artsub;
    }

    @Override
    public artSubCategory updateArtSub(artSubCategoryDTO artsub) {
        Integer artsubId = artsub.getSubCateId();
        artSubCategory nartsub = artSubRepository.findById(artsubId).orElseThrow(() -> new RuntimeException("没这个" + artsubId));
        BeanUtils.copyProperties(artsub,artsub);
        return nartsub;
    }

    @Override
    public void deleteArtSub(Integer artsubId) {
        artSubRepository.deleteById(artsubId);
    }

    @Override
    public artSubCategory queryArtSub(Integer artsubId) {
        return artSubRepository.findById(artsubId).orElseThrow(() -> new RuntimeException("没这个ID" + artsubId));
    }
}
