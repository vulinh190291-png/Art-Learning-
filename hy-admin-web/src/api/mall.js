import request from '@/utils/request'

// 商品
export function getProduct(productId) {
  return request.get('/product', { params: { productId } })
}
export function updateProduct(data) {
  return request.put('/product', data)
}
export function deleteProduct(productId) {
  // 后端接收 @RequestBody Integer
  return request.delete('/product', { data: productId })
}

// 订单
export function getOrderBatch(userIds) {
  // 使用后端提供的 batch 接口
  return request.post('/order/batch', userIds)
}
export function updateOrder(data) {
  return request.put('/order', data)
}
export function deleteOrder(orderId) {
  return request.delete('/order', { data: orderId })
}