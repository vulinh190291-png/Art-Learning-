package org.hyjava.hyall.collection.repository;

import org.hyjava.hyall.collection.pojo.Collection;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollectionRepository extends CrudRepository<Collection,Integer> {
}
