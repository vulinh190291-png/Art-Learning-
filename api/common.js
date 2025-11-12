import request from '@/utils/request.js';

/**
 * 获取所有艺术风格分类数据
 */
export function getArtStylesApi() {
	return request({
		url: '/art-styles',
		method: 'get'
	});
}

/**
 * 获取首页推荐内容
 */
export function getFeaturedApi() {
	return request({
		url: '/featured',
		method: 'get'
	});
}

/**
 * 地图逆地址解析（代理）
 * @param {object} params - { lat, lng }
 */
export function reverseGeocodeApi(params) {
	return request({
		url: '/maps/reverse-geocode',
		method: 'get',
		params
	});
}
