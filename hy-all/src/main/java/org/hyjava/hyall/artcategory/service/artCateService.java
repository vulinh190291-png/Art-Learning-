package org.hyjava.hyall.artcategory.service;

import org.hyjava.hyall.artcategory.pojo.artCategory;
import org.hyjava.hyall.artcategory.pojo.dto.artCategoryDTO;
import org.hyjava.hyall.artcategory.repository.artCateRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class artCateService implements IartCateService{
    @Autowired
    artCateRepository artCateRepository;

    @Override
    public artCategory addCate(artCategoryDTO artcategory) {
        artCategory artCategory = new artCategory();
        BeanUtils.copyProperties(artcategory,artCategory);
        return artCateRepository.save(artCategory);
    }

    @Override
    public artCategory updateCate(artCategoryDTO artcategory) {
        Integer artcateId = artcategory.getCategoryId();
        artCategory artCategory = artCateRepository.findById(artcateId).orElseThrow(() -> new RuntimeException("没有这个东西" + artcateId));
        BeanUtils.copyProperties(artcategory,artCategory);
        return artCateRepository.save(artCategory);
    }

    @Override
    public void deleteCate(Integer cateId) {
        artCateRepository.deleteById(cateId);
    }

    @Override
    public artCategory queryCate(Integer cateId) {
        return artCateRepository.findById(cateId).get();
    }
}
