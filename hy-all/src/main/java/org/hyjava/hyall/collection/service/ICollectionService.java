package org.hyjava.hyall.collection.service;

import org.hyjava.hyall.collection.pojo.Collection;
import org.hyjava.hyall.collection.pojo.dto.CollectionDTO;

public interface ICollectionService {
    public Collection addCollection(CollectionDTO collection);
    public Collection updateCollection(CollectionDTO Collection);
    public Collection queryCollection(Integer collectionId);
    public void deleteCollection(Integer collectionId);
}
