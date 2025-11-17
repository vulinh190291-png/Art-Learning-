package org.hyjava.hyall.product.service;

import org.hyjava.hyall.product.pojo.dto.productDTO;
import org.hyjava.hyall.product.pojo.product;
import org.hyjava.hyall.product.repository.productRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class productService implements IproductService{
    @Autowired
    productRepository productRepository;

    @Override
    public product addOneProduct(productDTO product) {
        product nProduct = new product();
        BeanUtils.copyProperties(product, nProduct);
        return productRepository.save(nProduct);
    }

    @Override
    public product updateOneProduct(productDTO product) {
        Integer productId = product.getId();
        product nProduct = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("没有这个东西" + productId));
        BeanUtils.copyProperties(product, nProduct);
        return productRepository.save(nProduct);
    }

    @Override
    public product queryOneProduct(Integer productId) {
        return productRepository.findById(productId).get();
    }

    @Override
    public void deleteOneProduct(Integer productId) {
        productRepository.deleteById(productId);
    }

    @Override
    public void deleteProducts(Iterable<Integer> productIdList) {
        productRepository.deleteAllById(productIdList);
    }

    @Override
    public void addProducts(Iterable<product> productList) {
        productRepository.saveAll(productList);
    }
}

