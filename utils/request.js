import axios from 'axios';
import uniappAdapter from 'axios-adapter-uniapp';

const service = axios.create({
	
	baseURL: 'http://localhost:3000/api', 
	timeout: 10000, // 10秒
	adapter: uniappAdapter,
});


service.interceptors.request.use(
	config => {

		uni.showLoading({
			title: '加载中...',
			mask: true
		});
		if (!config.headers) {
			config.headers = {};
		}
		if (!config.headers['Content-Type']) {
			config.headers['Content-Type'] = 'application/json';
		}
		return config;
	},
	error => {
		// 对请求错误做些什么
		console.error("请求拦截器错误:", error);
		uni.hideLoading();
		return Promise.reject(error);
	}
);

// 响应拦截器
service.interceptors.response.use(

	response => {
		uni.hideLoading();
		const res = response.data;

		if (res.success) {
			// 如果成功，直接返回后端数据中的业务数据部分
			return res;
		} else {
			uni.showToast({
				title: res.message || '操作失败',
				icon: 'none',
				duration: 2000
			});
			return Promise.reject(new Error(res.message || 'Error'));
		}
	},
	error => {
		uni.hideLoading();
		console.error('响应拦截器错误:', error);
		
		// 对不同的网络错误进行提示
		let message = '网络错误，请稍后重试';
		if (error.response) {
			switch (error.response.status) {
				case 401:
					message = '登录状态失效，请重新登录';
					break;
				case 404:
					message = '请求的资源未找到';
					break;
				case 500:
					message = '服务器内部错误';
					break;
				default:
					message = error.response.data.message || message;
			}
		} else if (error.message && error.message.includes('timeout')) {
			message = '请求超时，请检查网络';
		}
		
		uni.showToast({
			title: message,
			icon: 'none',
			duration: 2000
		});
		
		return Promise.reject(error);
	}
);

export default service;
