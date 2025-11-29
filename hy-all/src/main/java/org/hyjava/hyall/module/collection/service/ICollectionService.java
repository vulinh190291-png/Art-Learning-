package org.hyjava.hyall.module.collection.service;

import org.hyjava.hyall.module.collection.pojo.Collection;
import org.hyjava.hyall.module.collection.pojo.dto.CollectionDTO;

import java.util.List;

public interface ICollectionService {
    public Collection addCollection(CollectionDTO collection);
    public Collection updateCollection(CollectionDTO Collection);
    public Collection queryCollection(Integer collectionId);
    public void deleteCollection(Integer collectionId);
    public List<Collection> queryAllCollectionBatch(List<Integer> collectionId);
}
