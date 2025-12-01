package org.hyjava.hyall.module.order.service;

import org.hyjava.hyall.common.core.resultcode.ResultCodes;
import org.hyjava.hyall.common.exception.BizException;
import org.hyjava.hyall.module.address.pojo.Address;
import org.hyjava.hyall.module.address.repository.AddRepository;
import org.hyjava.hyall.module.order.pojo.Order;
import org.hyjava.hyall.module.order.pojo.OrderShippingAddress;
import org.hyjava.hyall.module.order.pojo.dto.OrderDTO;
import org.hyjava.hyall.module.order.repository.OrderRepository;
import org.hyjava.hyall.module.order.repository.OrderShippingAddressRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class OrderService implements IOrderService {
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    AddRepository addRepository; // 需要查用户地址

    @Autowired
    OrderShippingAddressRepository shippingAddressRepository; // 需要存快照

    @Override
    @Transactional // 务必加上事务
    public Order addOrder(OrderDTO orderDTO) {
        // 1. 保存订单主表
        Order nOrder = new Order();
        BeanUtils.copyProperties(orderDTO, nOrder);
        // 建议：orderNumber 应该后端生成，totalPrice 应该后端计算，这里暂且信前端
        nOrder.setCreatedAt(new Date());
        nOrder = orderRepository.save(nOrder);

        // 2. 处理地址快照 (核心逻辑)
        if (orderDTO.getAddressId() != null) {
            // 查出用户当时的地址
            Address userAddr = addRepository.findById(orderDTO.getAddressId())
                    .orElseThrow(() -> new BizException(ResultCodes.NOTFOUND));

            // 复制一份到快照表
            OrderShippingAddress snapshot = new OrderShippingAddress();
            snapshot.setOrderId(nOrder.getOrderId());
            snapshot.setRecipientName(userAddr.getRecipientName());
            snapshot.setPhone(userAddr.getPhone());
            snapshot.setRegion(userAddr.getRegion());
            snapshot.setDetail(userAddr.getDetailAddress());

            shippingAddressRepository.save(snapshot);
        } else {
            // 如果业务允许不选地址下单可忽略，否则抛异常
            // throw new BizException("请选择收货地址");
        }

        return nOrder;
    }

    @Override
    public void deleteOrder(Integer order_id) {
        orderRepository.deleteById(order_id);
    }

    @Override
    public Order updateOrder(OrderDTO Order) {
        Integer orderid = Order.getOrderId();
        Order nOrder = orderRepository.findById(orderid).orElseThrow(() -> new RuntimeException("没有这个东西" + orderid));
        BeanUtils.copyProperties(Order, nOrder);
        return orderRepository.save(nOrder);
    }

    @Override
    public Order queryOrder(Integer order_id) {
        return orderRepository.findById(order_id).orElse(null);
    }

    @Override
    public List<Order> queryAllOrderBatch(List<Integer> userIdlist) {
        return orderRepository.findAllById(userIdlist);
    }
}