package org.hyjava.hyall.product.service;

import org.hyjava.hyall.product.pojo.dto.productDTO;
import org.hyjava.hyall.product.pojo.product;
import org.springframework.stereotype.Service;

@Service
public interface  IproductService {
    public product addOneProduct(productDTO product);
    public void addProducts(Iterable<product> productList);

    public void deleteOneProduct(Integer productId);
    public void deleteProducts(Iterable<Integer> productIdList);

    public product updateOneProduct(productDTO product);

    public product queryOneProduct(Integer productId);
}
