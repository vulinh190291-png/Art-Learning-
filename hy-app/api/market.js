import request from '@/utils/request.js';

// --- 商品相关 ---
/**
 * 获取所有商品列表
 */
export function getProductsApi() {
	return request({
		url: '/products',
		method: 'get'
	});
}

/**
 * 获取单个商品详情
 * @param {number} 
 */
export function getProductDetailApi(productId) {
	return request({
		url: `/products/${productId}`,
		method: 'get'
	});
}

// --- 订单相关 ---
/**
 * 创建新订单
 * @param {object} 
 */
export function createOrderApi(data) {
	return request({
		url: '/orders',
		method: 'post',
		data
	});
}

/**
 * 获取用户的订单列表
 * @param {object} 
 */
export function getOrdersApi(params) {
	return request({
		url: '/orders',
		method: 'get',
		params
	});
}

/**
 * 获取单个订单详情
 * @param {string} 
 */
export function getOrderDetailApi(orderId) {
	return request({
		url: `/orders/${orderId}`,
		method: 'get'
	});
}

/**
 * 更新订单状态
 * @param {string} 
 * @param {object} 
 */
export function updateOrderStatusApi(orderId, data) {
	return request({
		url: `/orders/${orderId}/status`,
		method: 'put',
		data
	});
}

/**
 * 删除订单记录
 * @param {string} 
 */
export function deleteOrderApi(orderId) {
	return request({
		url: `/orders/${orderId}`,
		method: 'delete'
	});
}

// --- 购物车相关 ---
/**
 * 获取用户的购物车
 * @param {object} 
 */
export function getCartApi(params) {
	return request({
		url: '/cart',
		method: 'get',
		params
	});
}

/**
 * 添加商品到购物车
 * @param {object} 
 */
export function addToCartApi(data) {
	return request({
		url: '/cart/add',
		method: 'post',
		data
	});
}

/**
 * 更新购物车商品数量
 * @param {object} 
 */
export function updateCartApi(data) {
	return request({
		url: '/cart/update',
		method: 'post',
		data
	});
}

/**
 * 从购物车移除商品
 * @param {object} 
 */
export function removeFromCartApi(data) {
	return request({
		url: '/cart/remove',
		method: 'post',
		data
	});
}
