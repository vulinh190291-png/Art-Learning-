package org.hyjava.hyall.orderitem.controller;

import org.hyjava.hyall.address.pojo.ResponseMessage;
import org.hyjava.hyall.orderitem.pojo.Orderitem;
import org.hyjava.hyall.orderitem.pojo.dto.OrderitemDTO;
import org.hyjava.hyall.orderitem.service.IOrderitemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orderitem")
public class OrderitemController {
    @Autowired
    IOrderitemService orderItemService;
    @PostMapping
    public ResponseMessage<Orderitem> addOrderItem(@RequestBody @Validated OrderitemDTO orderItem) {
        Orderitem norderitem = orderItemService.addOrderItem(orderItem);
        return ResponseMessage.success(norderitem);
    }

    @DeleteMapping
    public void deleteOrderItem(@RequestBody Integer orderItemId) {
        orderItemService.deleteOrderItem(orderItemId);
    }

    @PutMapping
    public ResponseMessage<Orderitem> updateOrderItem(@RequestBody @Validated OrderitemDTO orderItem) {
        Orderitem norderitem = orderItemService.updateOrderItem(orderItem);
        return ResponseMessage.success(norderitem);
    }

    @GetMapping
    public ResponseMessage<Orderitem> queryOrderItem(@RequestBody Integer orderItemId) {
         Orderitem norderitem = orderItemService.queryOrderItem(orderItemId);
        return ResponseMessage.success(norderitem);
    }
}
