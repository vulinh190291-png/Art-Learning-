package org.hyjava.hyall.module.order.service;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.order.pojo.Order;
import org.hyjava.hyall.module.order.pojo.dto.OrderDTO;
import org.hyjava.hyall.module.order.repository.OrderRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService implements IOrderService{
    @Autowired
    OrderRepository orderRepository;

    @Override
    public Order addOrder(OrderDTO order){
        Order nOrder = new Order();
        BeanUtils.copyProperties(order, nOrder);
        return orderRepository.save(nOrder);
    }

    @Override
    public void deleteOrder(Integer order_id) {
        orderRepository.deleteById(order_id);
    }

    @Override
    public Order updateOrder(OrderDTO Order) {
        Integer orderid = Order.getOrderId();
        Order nOrder = orderRepository.findById(orderid).orElseThrow(() -> new RuntimeException("没有这个东西" +  orderid));
        BeanUtils.copyProperties(Order, nOrder);
        return orderRepository.save(nOrder);
    }

    @Override
    public Order queryOrder(Integer order_id) {
        return null;
    }

    @Override
    public List<Order> queryAllOrderBatch(List<Integer> userIdlist) {
        return orderRepository.findAllById(userIdlist);
    }
}
