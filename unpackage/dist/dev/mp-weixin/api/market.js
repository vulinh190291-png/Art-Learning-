"use strict";
const utils_request = require("../utils/request.js");
function getProductsApi() {
  return utils_request.service({
    url: "/products",
    method: "get"
  });
}
function getProductDetailApi(productId) {
  return utils_request.service({
    url: `/products/${productId}`,
    method: "get"
  });
}
function createOrderApi(data) {
  return utils_request.service({
    url: "/orders",
    method: "post",
    data
  });
}
function getOrdersApi(params) {
  return utils_request.service({
    url: "/orders",
    method: "get",
    params
  });
}
function getOrderDetailApi(orderId) {
  return utils_request.service({
    url: `/orders/${orderId}`,
    method: "get"
  });
}
function updateOrderStatusApi(orderId, data) {
  return utils_request.service({
    url: `/orders/${orderId}/status`,
    method: "put",
    data
  });
}
function deleteOrderApi(orderId) {
  return utils_request.service({
    url: `/orders/${orderId}`,
    method: "delete"
  });
}
function getCartApi(params) {
  return utils_request.service({
    url: "/cart",
    method: "get",
    params
  });
}
function addToCartApi(data) {
  return utils_request.service({
    url: "/cart/add",
    method: "post",
    data
  });
}
function updateCartApi(data) {
  return utils_request.service({
    url: "/cart/update",
    method: "post",
    data
  });
}
function removeFromCartApi(data) {
  return utils_request.service({
    url: "/cart/remove",
    method: "post",
    data
  });
}
exports.addToCartApi = addToCartApi;
exports.createOrderApi = createOrderApi;
exports.deleteOrderApi = deleteOrderApi;
exports.getCartApi = getCartApi;
exports.getOrderDetailApi = getOrderDetailApi;
exports.getOrdersApi = getOrdersApi;
exports.getProductDetailApi = getProductDetailApi;
exports.getProductsApi = getProductsApi;
exports.removeFromCartApi = removeFromCartApi;
exports.updateCartApi = updateCartApi;
exports.updateOrderStatusApi = updateOrderStatusApi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/market.js.map
