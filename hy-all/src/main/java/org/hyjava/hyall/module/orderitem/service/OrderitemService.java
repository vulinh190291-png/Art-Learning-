package org.hyjava.hyall.module.orderitem.service;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.orderitem.pojo.Orderitem;
import org.hyjava.hyall.module.orderitem.pojo.dto.OrderitemDTO;
import org.hyjava.hyall.module.orderitem.repository.OrderitemRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderitemService implements IOrderitemService {
    @Autowired
    OrderitemRepository orderItemRepository;

    @Override
    public Orderitem addOrderItem(OrderitemDTO orderItem){
        Orderitem norderItem = new Orderitem();
        BeanUtils.copyProperties(orderItem,norderItem);
        return orderItemRepository.save(norderItem);
    }

    @Override
    public void deleteOrderItem(Integer OrderItemId){
        orderItemRepository.deleteById(OrderItemId);
    }

    @Override
    public Orderitem updateOrderItem(OrderitemDTO OrderItem){
        Integer OrderItemId = OrderItem.getOrderItemId();
        Orderitem norderItem = orderItemRepository.findById(OrderItemId).orElseThrow(()-> new RuntimeException("要更新的物品不存在，ID：" + OrderItemId));
        BeanUtils.copyProperties(OrderItem,norderItem);
        return orderItemRepository.save(norderItem);
    }
    @Override
    public Orderitem queryOrderItem(Integer orderItemId) {
        return orderItemRepository.findById(orderItemId).get();
    }

}
