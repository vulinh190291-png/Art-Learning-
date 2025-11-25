package org.hyjava.hyall.module.collection.repository;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.collection.pojo.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollectionRepository extends JpaRepository<Collection,Integer> {
}
