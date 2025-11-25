package org.hyjava.hyall.module.artcategory.repository;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.artcategory.pojo.Artcategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtcategoryRepository extends JpaRepository<Artcategory, Integer> {
}
