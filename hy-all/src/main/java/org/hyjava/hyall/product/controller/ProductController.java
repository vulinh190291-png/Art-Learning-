package org.hyjava.hyall.product.controller;

import org.hyjava.hyall.address.pojo.ResponseMessage;
import org.hyjava.hyall.product.pojo.dto.ProductDTO;
import org.hyjava.hyall.product.pojo.Product;
import org.hyjava.hyall.product.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private IProductService productService;

    @PostMapping
    public ResponseMessage<Product> addOneProduct(@RequestBody ProductDTO product) {
        Product nProduct = productService.addOneProduct(product);
        return ResponseMessage.success(nProduct);
    }

    @PostMapping("/batch")
    public ResponseMessage<Product> addProducts(@RequestBody Iterable<Product> product) {
        productService.addProducts(product);
        return ResponseMessage.success(null);
    }

    @DeleteMapping
    public ResponseMessage<Product> deleteOneProduct(@RequestBody Integer productId) {
        productService.deleteOneProduct(productId);
        return ResponseMessage.success(null);
    }

    @DeleteMapping("/dbatch")
    public ResponseMessage<Product> deleteProducts(@RequestBody Iterable<Integer> productId) {
        productService.deleteProducts(productId);
        return ResponseMessage.success(null);
    }

    @PutMapping
    public ResponseMessage<Product> updateOneProduct(@RequestBody ProductDTO product) {
        Product nProduct = productService.updateOneProduct(product);
        return ResponseMessage.success(nProduct);
    }

    @GetMapping
    public ResponseMessage<Product> queryOneProduct(@RequestParam Integer productId) {
        Product nProduct = productService.queryOneProduct(productId);
        return ResponseMessage.success(nProduct);
    }

}
