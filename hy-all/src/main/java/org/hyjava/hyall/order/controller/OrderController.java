package org.hyjava.hyall.order.controller;

import org.hyjava.hyall.address.pojo.ResponseMessage;
import org.hyjava.hyall.order.pojo.Order;
import org.hyjava.hyall.order.pojo.dto.OrderDTO;
import org.hyjava.hyall.order.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    IOrderService orderService;
    @PostMapping
    public ResponseMessage<Order> addOrder(@RequestBody @Validated OrderDTO order) {
        Order norder= orderService.addOrder(order);
        return ResponseMessage.success(norder);
    }

    @DeleteMapping
    public void deleteOrder(@RequestBody Integer order_id) {
        orderService.deleteOrder(order_id);
    }

    @PutMapping
    public ResponseMessage<Order> updateOrder(@RequestBody @Validated OrderDTO order) {
        Order norder = orderService.updateOrder(order);
        return ResponseMessage.success(norder);
    }

    @GetMapping
    public ResponseMessage<Order> queryOrder(@RequestBody Integer orderId) {
        Order norder = orderService.queryOrder(orderId);
        return ResponseMessage.success(norder);
    }
}
