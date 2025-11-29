package org.hyjava.hyall.module.shopcartitem.service;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.shopcartitem.pojo.Sci;
import org.hyjava.hyall.module.shopcartitem.pojo.dto.SciDTO;
import org.springframework.stereotype.Service;

import java.util.List;

//本文件的全名是shopping_cart_item
@Service
public interface ISciService {
    public Sci addSci(SciDTO sci);
    public void deleteSci(Integer cartItemId);
    public Sci updateSci(SciDTO Sci);
    public Sci querySci(Integer cartItemId);
    public List<Sci> queryAllSciBatch(List<Integer> userIdList);
}
