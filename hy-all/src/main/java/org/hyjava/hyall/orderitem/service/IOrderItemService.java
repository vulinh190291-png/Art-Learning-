package org.hyjava.hyall.orderitem.service;

import org.hyjava.hyall.orderitem.pojo.OrderItem;
import org.hyjava.hyall.orderitem.pojo.dto.OrderItemDTO;
import org.springframework.stereotype.Service;

@Service
public interface IOrderItemService {
    public OrderItem addOrderItem(OrderItemDTO orderItem);
    public void deleteOrderItem(Integer orderItemId);
    public OrderItem updateOrderItem(OrderItemDTO OrderItem);
    public OrderItem queryOrderItem(Integer orderItemId);
}
