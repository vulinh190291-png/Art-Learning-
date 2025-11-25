package org.hyjava.hyall.module.product.service;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.product.pojo.dto.ProductDTO;
import org.hyjava.hyall.module.product.pojo.Product;
import org.springframework.stereotype.Service;

@Service
public interface IProductService {
    public Product addOneProduct(ProductDTO product);
    public void addProducts(Iterable<Product> productList);

    public void deleteOneProduct(Integer productId);
    public void deleteProducts(Iterable<Integer> productIdList);

    public Product updateOneProduct(ProductDTO product);

    public Product queryOneProduct(Integer productId);
}
