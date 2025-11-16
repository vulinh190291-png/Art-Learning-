package org.hyjava.hyall.order.service;


import org.hyjava.hyall.order.pojo.Order;
import org.hyjava.hyall.order.pojo.dto.OrderDTO;

public interface IOrderService {
    public Order addOrder(OrderDTO order);
    public void deleteOrder(Integer orderId);
    public Order updateOrder(OrderDTO Order);
    public Order queryOrder(Integer orderId);
}
