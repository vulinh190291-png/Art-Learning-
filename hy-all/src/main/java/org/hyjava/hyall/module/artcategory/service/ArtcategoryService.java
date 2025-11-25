package org.hyjava.hyall.module.artcategory.service;

import org.hyjava.hyall.module.artcategory.pojo.Artcategory;
import org.hyjava.hyall.module.artcategory.pojo.dto.ArtcategoryDTO;
import org.hyjava.hyall.module.artcategory.repository.ArtcategoryRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArtcategoryService implements IArtcategoryService {
    @Autowired
    ArtcategoryRepository artCateRepository;

    @Override
    public Artcategory addCate(ArtcategoryDTO artcategory) {
        Artcategory artCategory = new Artcategory();
        BeanUtils.copyProperties(artcategory,artCategory);
        return artCateRepository.save(artCategory);
    }

    @Override
    public Artcategory updateCate(ArtcategoryDTO artcategory) {
        Integer artcateId = artcategory.getCategoryId();
        Artcategory artCategory = artCateRepository.findById(artcateId).orElseThrow(() -> new RuntimeException("没有这个东西" + artcateId));
        BeanUtils.copyProperties(artcategory,artCategory);
        return artCateRepository.save(artCategory);
    }

    @Override
    public void deleteCate(Integer cateId) {
        artCateRepository.deleteById(cateId);
    }

    @Override
    public Artcategory queryCate(Integer cateId) {
        return artCateRepository.findById(cateId).get();
    }
}
