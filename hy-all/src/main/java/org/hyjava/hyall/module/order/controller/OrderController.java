package org.hyjava.hyall.module.order.controller;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.order.pojo.Order;
import org.hyjava.hyall.module.order.pojo.dto.OrderDTO;
import org.hyjava.hyall.module.order.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    IOrderService orderService;
    @PostMapping
    public Result<Order> addOrder(@RequestBody @Validated OrderDTO order) {
        Order norder= orderService.addOrder(order);
        return Result.success(norder);
    }

    @DeleteMapping
    public void deleteOrder(@RequestBody Integer order_id) {
        orderService.deleteOrder(order_id);
    }

    @PutMapping
    public Result<Order> updateOrder(@RequestBody @Validated OrderDTO order) {
        Order norder = orderService.updateOrder(order);
        return Result.success(norder);
    }

    @GetMapping
    public Result<Order> queryOrder(@RequestBody Integer orderId) {
        Order norder = orderService.queryOrder(orderId);
        return Result.success(norder);
    }

    @PostMapping("/batch")
    public Result<List<Order>> queryAllOrderBatch(@RequestBody List<Integer> userIdlist) {
        List<Order> list = orderService.queryAllOrderBatch(userIdlist);
        return Result.success(list);
    }
}
