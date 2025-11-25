package org.hyjava.hyall.module.product.controller;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.product.pojo.dto.ProductDTO;
import org.hyjava.hyall.module.product.pojo.Product;
import org.hyjava.hyall.module.product.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private IProductService productService;

    @PostMapping
    public Result<Product> addOneProduct(@RequestBody ProductDTO product) {
        Product nProduct = productService.addOneProduct(product);
        return Result.success(nProduct);
    }

    @PostMapping("/batch")
    public Result<Product> addProducts(@RequestBody Iterable<Product> product) {
        productService.addProducts(product);
        return Result.success(null);
    }

    @DeleteMapping
    public Result<Product> deleteOneProduct(@RequestBody Integer productId) {
        productService.deleteOneProduct(productId);
        return Result.success(null);
    }

    @DeleteMapping("/dbatch")
    public Result<Product> deleteProducts(@RequestBody Iterable<Integer> productId) {
        productService.deleteProducts(productId);
        return Result.success(null);
    }

    @PutMapping
    public Result<Product> updateOneProduct(@RequestBody ProductDTO product) {
        Product nProduct = productService.updateOneProduct(product);
        return Result.success(nProduct);
    }

    @GetMapping
    public Result<Product> queryOneProduct(@RequestParam Integer productId) {
        Product nProduct = productService.queryOneProduct(productId);
        return Result.success(nProduct);
    }

}
