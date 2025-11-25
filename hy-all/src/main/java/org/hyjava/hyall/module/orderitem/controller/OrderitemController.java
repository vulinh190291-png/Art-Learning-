package org.hyjava.hyall.module.orderitem.controller;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.orderitem.pojo.Orderitem;
import org.hyjava.hyall.module.orderitem.pojo.dto.OrderitemDTO;
import org.hyjava.hyall.module.orderitem.service.IOrderitemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orderitem")
public class OrderitemController {
    @Autowired
    IOrderitemService orderItemService;
    @PostMapping
    public Result<Orderitem> addOrderItem(@RequestBody @Validated OrderitemDTO orderItem) {
        Orderitem norderitem = orderItemService.addOrderItem(orderItem);
        return Result.success(norderitem);
    }

    @DeleteMapping
    public void deleteOrderItem(@RequestBody Integer orderItemId) {
        orderItemService.deleteOrderItem(orderItemId);
    }

    @PutMapping
    public Result<Orderitem> updateOrderItem(@RequestBody @Validated OrderitemDTO orderItem) {
        Orderitem norderitem = orderItemService.updateOrderItem(orderItem);
        return Result.success(norderitem);
    }

    @GetMapping
    public Result<Orderitem> queryOrderItem(@RequestBody Integer orderItemId) {
         Orderitem norderitem = orderItemService.queryOrderItem(orderItemId);
        return Result.success(norderitem);
    }
}
