package org.hyjava.hyall.module.collection.service;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.collection.pojo.Collection;
import org.hyjava.hyall.module.collection.pojo.dto.CollectionDTO;

public interface ICollectionService {
    public Collection addCollection(CollectionDTO collection);
    public Collection updateCollection(CollectionDTO Collection);
    public Collection queryCollection(Integer collectionId);
    public void deleteCollection(Integer collectionId);
}
