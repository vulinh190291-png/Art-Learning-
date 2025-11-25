package org.hyjava.hyall.module.collection.repository;

import org.hyjava.hyall.module.collection.pojo.Collection;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollectionRepository extends CrudRepository<Collection,Integer> {
}
