package org.hyjava.hyall.product.controller;

import org.hyjava.hyall.address.pojo.ResponseMessage;
import org.hyjava.hyall.product.pojo.dto.productDTO;
import org.hyjava.hyall.product.pojo.product;
import org.hyjava.hyall.product.service.IproductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
public class productController {
    @Autowired
    private IproductService productService;

    @PostMapping
    public ResponseMessage<product> addOneProduct(@RequestBody productDTO product) {
        product nProduct = productService.addOneProduct(product);
        return ResponseMessage.success(nProduct);
    }

    @PostMapping("/batch")
    public ResponseMessage<product> addProducts(@RequestBody Iterable<product> product) {
        productService.addProducts(product);
        return ResponseMessage.success(null);
    }

    @DeleteMapping
    public ResponseMessage<product> deleteOneProduct(@RequestBody Integer productId) {
        productService.deleteOneProduct(productId);
        return ResponseMessage.success(null);
    }

    @DeleteMapping("/dbatch")
    public ResponseMessage<product> deleteProducts(@RequestBody Iterable<Integer> productId) {
        productService.deleteProducts(productId);
        return ResponseMessage.success(null);
    }

    @PutMapping
    public ResponseMessage<product> updateOneProduct(@RequestBody productDTO product) {
        product nProduct = productService.updateOneProduct(product);
        return ResponseMessage.success(nProduct);
    }

    @GetMapping
    public ResponseMessage<product> queryOneProduct(@RequestParam Integer productId) {
        product nProduct = productService.queryOneProduct(productId);
        return ResponseMessage.success(nProduct);
    }

}
