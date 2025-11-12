import request from '@/utils/request.js';

/**
 * 获取所有课程列表
 */
export function getCoursesApi() {
	return request({
		url: '/courses',
		method: 'get'
	});
}

/**
 * 获取单个课程详情
 * @param {number} courseId - 课程ID
 */
export function getCourseDetailApi(courseId) {
	return request({
		url: `/courses/${courseId}`,
		method: 'get'
	});
}

/**
 * 获取用户课程进度
 * @param {object} params - { userId, courseId }
 */
export function getCourseProgressApi(params) {
	return request({
		url: '/progress',
		method: 'get',
		params
	});
}

/**
 * 更新用户课程进度
 * @param {object} data - { userId, courseId, chapterId }
 */
export function updateCourseProgressApi(data) {
	return request({
		url: '/progress',
		method: 'post',
		data
	});
}

/**
 * 获取用户的证书列表
 * @param {object} params - { userId }
 */
export function getCertificatesApi(params) {
	return request({
		url: '/certificates',
		method: 'get',
		params
	});
}
