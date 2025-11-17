package org.hyjava.hyall.orderitem.controller;

import org.hyjava.hyall.address.pojo.ResponseMessage;
import org.hyjava.hyall.orderitem.pojo.OrderItem;
import org.hyjava.hyall.orderitem.pojo.dto.OrderItemDTO;
import org.hyjava.hyall.orderitem.service.IOrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orderitem")
public class OrderItemController {
    @Autowired
    IOrderItemService orderItemService;
    @PostMapping
    public ResponseMessage<OrderItem> addOrderItem(@RequestBody @Validated OrderItemDTO orderItem) {
        OrderItem norderitem = orderItemService.addOrderItem(orderItem);
        return ResponseMessage.success(norderitem);
    }

    @DeleteMapping
    public void deleteOrderItem(@RequestBody Integer orderItemId) {
        orderItemService.deleteOrderItem(orderItemId);
    }

    @PutMapping
    public ResponseMessage<OrderItem> updateOrderItem(@RequestBody @Validated OrderItemDTO orderItem) {
        OrderItem norderitem = orderItemService.updateOrderItem(orderItem);
        return ResponseMessage.success(norderitem);
    }

    @GetMapping
    public ResponseMessage<OrderItem> queryOrderItem(@RequestBody Integer orderItemId) {
         OrderItem norderitem = orderItemService.queryOrderItem(orderItemId);
        return ResponseMessage.success(norderitem);
    }
}
