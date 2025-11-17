package org.hyjava.hyall.orderitem.service;

import org.hyjava.hyall.orderitem.pojo.OrderItem;
import org.hyjava.hyall.orderitem.pojo.dto.OrderItemDTO;
import org.hyjava.hyall.orderitem.repository.OrderItemRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderItemService implements IOrderItemService {
    @Autowired
    OrderItemRepository orderItemRepository;

    @Override
    public OrderItem addOrderItem(OrderItemDTO orderItem){
        OrderItem norderItem = new OrderItem();
        BeanUtils.copyProperties(orderItem,norderItem);
        return orderItemRepository.save(norderItem);
    }

    @Override
    public void deleteOrderItem(Integer OrderItemId){
        orderItemRepository.deleteById(OrderItemId);
    }

    @Override
    public OrderItem updateOrderItem(OrderItemDTO OrderItem){
        Integer OrderItemId = OrderItem.getOrderItemId();
        OrderItem norderItem = orderItemRepository.findById(OrderItemId).orElseThrow(()-> new RuntimeException("要更新的物品不存在，ID：" + OrderItemId));
        BeanUtils.copyProperties(OrderItem,norderItem);
        return orderItemRepository.save(norderItem);
    }
    @Override
    public OrderItem queryOrderItem(Integer orderItemId) {
        return orderItemRepository.findById(orderItemId).get();
    }

}
