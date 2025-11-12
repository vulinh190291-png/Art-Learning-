import request from '@/utils/request.js';

/**
 * 获取用户的地址列表
 * @param {object} 
 */
export function getAddressesApi(params) {
	return request({
		url: '/addresses',
		method: 'get',
		params
	});
}

/**
 * 添加新地址
 * @param {object} 
 */
export function addAddressApi(data) {
	return request({
		url: '/addresses',
		method: 'post',
		data
	});
}

/**
 * 更新指定地址
 * @param {number} 
 * @param {object} 
 */
export function updateAddressApi(addressId, data) {
	return request({
		url: `/addresses/${addressId}`,
		method: 'put',
		data
	});
}

/**
 * 删除指定地址
 * @param {number} 
 * @param {object} 
 */
export function deleteAddressApi(addressId, data) {
	return request({
		url: `/addresses/${addressId}`,
		method: 'delete',
		data
	});
}

/**
 * 设置为默认地址
 * @param {number} 
 * @param {object} 
 */
export function setDefaultAddressApi(addressId, data) {
	return request({
		url: `/addresses/${addressId}/default`,
		method: 'post',
		data
	});
}
