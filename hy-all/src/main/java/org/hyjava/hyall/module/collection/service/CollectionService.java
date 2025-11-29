package org.hyjava.hyall.module.collection.service;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.collection.pojo.Collection;
import org.hyjava.hyall.module.collection.pojo.dto.CollectionDTO;
import org.hyjava.hyall.module.collection.repository.CollectionRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollectionService implements ICollectionService{
    @Autowired
    CollectionRepository collectionRepository;

    @Override
    public Collection addCollection(CollectionDTO collection){
        Collection ncollection = new Collection();
        BeanUtils.copyProperties(collection,ncollection);
        return collectionRepository.save(ncollection);
    }

    @Override
    public void deleteCollection(Integer collectionId) {collectionRepository.deleteById(collectionId);}

    @Override
    public Collection updateCollection(CollectionDTO Collection){
        Integer collectionId = Collection.getCollectionId();
        Collection ncollection = collectionRepository.findById(collectionId).orElseThrow(()->new RuntimeException("没有这个帖子"+collectionId));
        BeanUtils.copyProperties(Collection,ncollection);
        return collectionRepository.save(ncollection);
    }

    @Override
    public Collection queryCollection(Integer collectionId) {return collectionRepository.findById(collectionId).get();}

    @Override
    public List<Collection> queryAllCollectionBatch(List<Integer> collectionId){
        return collectionRepository.findAllById(collectionId);
    }
}
