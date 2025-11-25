package org.hyjava.hyall.module.orderitem.service;
import org.hyjava.hyall.common.core.result.Result;

import org.hyjava.hyall.module.orderitem.pojo.Orderitem;
import org.hyjava.hyall.module.orderitem.pojo.dto.OrderitemDTO;
import org.springframework.stereotype.Service;

@Service
public interface IOrderitemService {
    public Orderitem addOrderItem(OrderitemDTO orderItem);
    public void deleteOrderItem(Integer orderItemId);
    public Orderitem updateOrderItem(OrderitemDTO OrderItem);
    public Orderitem queryOrderItem(Integer orderItemId);
}
