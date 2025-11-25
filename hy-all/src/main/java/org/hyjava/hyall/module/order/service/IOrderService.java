package org.hyjava.hyall.module.order.service;
import org.hyjava.hyall.common.core.result.Result;


import org.hyjava.hyall.module.order.pojo.Order;
import org.hyjava.hyall.module.order.pojo.dto.OrderDTO;

public interface IOrderService {
    public Order addOrder(OrderDTO order);
    public void deleteOrder(Integer orderId);
    public Order updateOrder(OrderDTO Order);
    public Order queryOrder(Integer orderId);
}
