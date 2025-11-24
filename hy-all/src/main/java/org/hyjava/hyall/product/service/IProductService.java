package org.hyjava.hyall.product.service;

import org.hyjava.hyall.product.pojo.dto.ProductDTO;
import org.hyjava.hyall.product.pojo.Product;
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
