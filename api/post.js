import request from '@/utils/request.js';

/**
 * 获取帖子列表
 * @param {object} 
 */
export function getPostsApi(params) {
	return request({
		url: '/posts',
		method: 'get',
		params
	});
}

/**
 * 获取用户收藏的帖子列表
 * @param {object} 
 */
export function getCollectionsApi(params) {
	return request({
		url: '/collections',
		method: 'get',
		params
	});
}

/**
 * 点赞/取消点赞帖子
 * @param {number} 
 * @param {object} 
 */
export function likePostApi(postId, data) {
	return request({
		url: `/posts/${postId}/like`,
		method: 'post',
		data
	});
}

/**
 * 收藏/取消收藏帖子
 * @param {number} 
 * @param {object} 
 */
export function collectPostApi(postId, data) {
	return request({
		url: `/posts/${postId}/collect`,
		method: 'post',
		data
	});
}

/**
 * 发表评论
 * @param {number} 
 * @param {object} 
 */
export function addCommentApi(postId, data) {
	return request({
		url: `/posts/${postId}/comments`,
		method: 'post',
		data
	});
}

/**
 * 删除帖子
 * @param {number} 
 * @param {object} 
 */
export function deletePostApi(postId, params) {
	return request({
		url: `/posts/${postId}`,
		method: 'delete',
		params
	});
}
