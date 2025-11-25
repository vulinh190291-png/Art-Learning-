package org.hyjava.hyall.module.artsubcategory.repository;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.artsubcategory.pojo.Artsubcategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtsubRepository extends JpaRepository<Artsubcategory, Integer> {
}
