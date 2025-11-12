// huiying_app/api/user.js

import request from '@/utils/request.js';

/**
 * 登录API
 * @param {object} 
 */
export function loginApi(data) {
	return request({
		url: '/login',
		method: 'post',
		data
	});
}

/**
 * 注册API
 * @param {object}
 */
export function registerApi(data) {
	return request({
		url: '/register',
		method: 'post',
		data
	});
}

/**
 * 更新个人资料API
 * @param {object}
 */
export function updateProfileApi(data) {
    return request({
        url: '/profile',
        method: 'put',
        data
    });
}
