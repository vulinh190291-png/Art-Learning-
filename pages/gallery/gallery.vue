<template>
	<view class="page-container">
		<!-- 排序Tabs -->
		<view class="tabs-container">
			<u-tabs :list="sortTabs" @click="onSortTabClick" :current="currentSortIndex" :activeStyle="{ color: '#008585', fontWeight: 'bold' }"></u-tabs>
		</view>

		<!-- 初始加载状态 -->
		<view v-if="isLoading && posts.length === 0" class="loading-state">
			<u-loading-icon mode="circle" size="30" text="正在加载画廊..."></u-loading-icon>
		</view>
		
		<!-- 空状态 -->
		<view v-else-if="posts.length === 0" class="empty-state">
			<u-empty mode="list" icon="/static/logo.png" text="画廊里空空如也，快来发布第一幅作品吧！"></u-empty>
		</view>
		
		<!-- 帖子列表 -->
		<view v-else class="flex-grid-container">
			<view v-for="(item, index) in posts" :key="item.id" class="post-card" @click="showPostDetail(item)">
				<u--image :src="item.imageUrl" width="100%" radius="8" :lazy-load="true" :show-loading="true"></u--image>
				<view class="card-content">
					<view class="title u-line-2">{{ item.title }}</view>
					<view class="card-footer">
						<view class="author-info">
							<u--image :src="item.userAvatar" width="40rpx" height="40rpx" shape="circle"></u--image>
							<text class="nickname">{{ item.userNickname }}</text>
						</view>
						<view class="like-section" @click.stop="handleLike(item)">
							<u-icon :name="item.isLiked ? 'heart-fill' : 'heart'" :color="item.isLiked ? '#c7522a' : '#666'" size="20"></u-icon>
							<text class="like-count">{{ item.likes > 0 ? item.likes : '' }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 加载更多 -->
		<u-loadmore :status="loadMoreStatus" v-if="posts.length > 0" />

		<!-- 发布按钮 -->
		<view v-if="isLoggedIn" class="fab-button" @click="goToPostPage">
			<u-icon name="plus" color="#fff" size="28"></u-icon>
		</view>
		
		<!-- 详情弹窗 -->
		<u-popup :show="isDetailShow" @close="isDetailShow = false" mode="bottom" round="20">
			<view class="detail-popup-container" v-if="selectedPost">
				<view class="popup-header">
					<text class="header-title">作品详情</text>
					<u-icon name="close" class="close-btn" size="20" @click="isDetailShow = false"></u-icon>
				</view>
				<scroll-view scroll-y class="popup-scroll-view">
					<view class="scroll-content-wrapper">
						<view class="detail-author-info">
							<u--image :src="selectedPost.userAvatar" width="80rpx" height="80rpx" shape="circle"></u--image>
							<view class="author-text">
								<view class="nickname">{{ selectedPost.userNickname }}</view>
								<view class="post-time">{{ formatTimestamp(selectedPost.createdAt) }}</view>
							</view>
						</view>
						<view class="detail-content">
							<view class="detail-title">{{ selectedPost.title }}</view>
							<view class="detail-desc" v-if="selectedPost.description">{{ selectedPost.description }}</view>
							<u--image :src="selectedPost.imageUrl" width="100%" mode="widthFix" radius="8"></u--image>
							<view class="detail-tag" v-if="selectedPost.artCategory">{{ selectedPost.artCategory }}</view>
						</view>
						<view class="comment-section">
							<u-divider text="评论区"></u-divider>
							<view v-if="!selectedPost.comments || selectedPost.comments.length === 0" class="comment-empty">
								<u-empty mode="comment" text="还没有评论，快来抢沙发吧！"></u-empty>
							</view>
							<view v-else class="comment-list">
								<view v-for="comment in selectedPost.comments" :key="comment.commentId" class="comment-item">
									<u--image :src="comment.userAvatar" width="64rpx" height="64rpx" shape="circle"></u--image>
									<view class="comment-body">
										<view class="comment-header">
											<text class="nickname">{{ comment.userNickname }}</text>
											<text class="time">{{ formatTimestamp(comment.createdAt) }}</text>
										</view>
										<view class="content">{{ comment.content }}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="footer-wrapper">
					<view class="comment-input-bar">
						<u--input placeholder="发表你的看法..." v-model="newCommentContent" border="surround" shape="round" :adjust-position="false"></u--input>
						<u-button text="发送" type="primary" :customStyle="sendBtnStyle" @click="handleCommentSubmit"></u-button>
					</view>
					<view class="detail-action-bar">
						<view class="action-item" @click="handleLike(selectedPost)">
							<u-icon :name="selectedPost.isLiked ? 'heart-fill' : 'heart'" :color="selectedPost.isLiked ? '#c7522a' : '#333'" size="24"></u-icon>
							<text class="action-text">{{ selectedPost.likes > 0 ? selectedPost.likes : '点赞' }}</text>
						</view>
						<view class="action-item">
							<u-icon name="chat" color="#333" size="24"></u-icon>
							<text class="action-text">评论</text>
						</view>
						<view class="action-item" @click="handleCollect(selectedPost)">
							<u-icon :name="selectedPost.isCollected ? 'star-fill' : 'star'" :color="selectedPost.isCollected ? '#f0daa5' : '#333'" size="24"></u-icon>
							<text class="action-text">收藏</text>
						</view>
						<view v-if="isLoggedIn && userInfo.id === selectedPost.userId" class="action-item" @click="handleDeletePost">
							<u-icon name="trash" color="#c7522a" size="24"></u-icon>
							<text class="action-text" style="color: #c7522a">删除</text>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onShow, onHide, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import { getPostsApi, likePostApi, collectPostApi, addCommentApi, deletePostApi } from '@/api/post.js';

// --- 状态变量 ---
const posts = ref([]);
const isLoading = ref(true);
const isLoggedIn = ref(false);
const userInfo = ref(null);
const isDetailShow = ref(false);
const selectedPost = ref(null);
const newCommentContent = ref('');

// --- 分页和排序 ---
const page = ref(1);
const limit = 6;
const hasMore = ref(true);
const loadMoreStatus = ref('loadmore');
const sortTabs = ref([{ name: '最新' }, { name: '热门' }]);
const currentSortBy = ref('latest');
const currentSortIndex = ref(0);

// --- 计算属性 ---
const sendBtnStyle = computed(() => ({
	backgroundColor: '#008585', color: '#fff', width: '140rpx', height: '64rpx', margin: '0 0 0 20rpx'
}));

const fetchPosts = async (isLoadMore = false) => {
	if (isLoadMore && !hasMore.value) {
		loadMoreStatus.value = 'nomore';
		return;
	}
	loadMoreStatus.value = 'loading';
	
	try {
		const params = {
			sortBy: currentSortBy.value,
			page: page.value,
			limit: limit,
			userId: userInfo.value ? userInfo.value.id : null
		};
		
		const [res] = await Promise.all([
			getPostsApi(params),
			new Promise(resolve => setTimeout(resolve, 500)) 
		]);
		
		const fetchedPosts = res.posts || [];
		posts.value = isLoadMore ? [...posts.value, ...fetchedPosts] : fetchedPosts;
		hasMore.value = res.hasMore;
		loadMoreStatus.value = hasMore.value ? 'loadmore' : 'nomore';

	} catch (error) {
		console.error("获取帖子列表失败:", error);
		loadMoreStatus.value = 'loadmore';
	} finally {
		isLoading.value = false;
		uni.stopPullDownRefresh();
	}
};

const handleLike = async (post) => {
	if (!isLoggedIn.value) return uni.showToast({ title: '请先登录', icon: 'none' });
	
	const originalIsLiked = post.isLiked;
	const originalLikes = post.likes;
	
	post.isLiked = !post.isLiked;
	post.likes += post.isLiked ? 1 : -1;

	try {
		await likePostApi(post.id, { userId: userInfo.value.id });
	} catch (error) {
		post.isLiked = originalIsLiked;
		post.likes = originalLikes;
		console.error("点赞操作失败:", error);
	}
};

const handleCollect = async (post) => {
	if (!isLoggedIn.value) return uni.showToast({ title: '请先登录', icon: 'none' });
	
	const originalIsCollected = post.isCollected;
	post.isCollected = !post.isCollected;

	try {
		await collectPostApi(post.id, { userId: userInfo.value.id });
	} catch (error) {
		post.isCollected = originalIsCollected;
		console.error("收藏操作失败:", error);
	}
};

const handleCommentSubmit = async () => {
	if (!isLoggedIn.value) return uni.showToast({ title: '请先登录', icon: 'none' });
	const content = newCommentContent.value.trim();
	if (!content) return uni.showToast({ title: '评论内容不能为空', icon: 'none' });
	
	const tempId = `temp_${Date.now()}`;
	const tempComment = {
		commentId: tempId,
		userId: userInfo.value.id,
		userNickname: userInfo.value.nickname,
		userAvatar: userInfo.value.avatar,
		content: content,
		createdAt: Date.now()
	};
	
	// 乐观更新UI
	selectedPost.value.comments.push(tempComment);
	newCommentContent.value = '';

	try {
		const res = await addCommentApi(selectedPost.value.id, { userId: userInfo.value.id, content: content });
		const finalComment = res.comment;
		const commentIndex = selectedPost.value.comments.findIndex(c => c.commentId === tempId);
		if (commentIndex > -1) {
			selectedPost.value.comments.splice(commentIndex, 1, finalComment);
		}
	} catch (error) {
		const commentIndex = selectedPost.value.comments.findIndex(c => c.commentId === tempId);
		if (commentIndex > -1) {
			selectedPost.value.comments.splice(commentIndex, 1);
		}
		console.error("评论失败:", error);
	}
};

const handleDeletePost = () => {
	uni.showModal({
		title: '确认删除',
		content: '确定要删除这幅作品吗？此操作无法撤销。',
		success: async (res) => {
			if(res.confirm) {
				try {
					await deletePostApi(selectedPost.value.id, { userId: userInfo.value.id });
					isDetailShow.value = false;
					handleRefresh();
				} catch (error) {
					console.error("删除帖子失败:", error);
				}
			}
		}
	})
};


const handleRefresh = () => {
	posts.value = [];
	page.value = 1;
	hasMore.value = true;
	isLoading.value = true;
	loadMoreStatus.value = 'loadmore';
	fetchPosts();
}

const onSortTabClick = (item) => {
	const newSortBy = item.index === 0 ? 'latest' : 'popular';
	if (currentSortBy.value === newSortBy) return;
	currentSortIndex.value = item.index;
	currentSortBy.value = newSortBy;
	handleRefresh();
};

const checkLoginStatus = () => {
	const user = uni.getStorageSync('user_info');
	userInfo.value = user;
	isLoggedIn.value = !!user;
};

const goToPostPage = () => {
	uni.navigateTo({ url: '/pages/post/post' });
};

const showPostDetail = (post) => {
	selectedPost.value = { ...post }; // 创建一个副本，防止弹窗内的修改影响列表
	isDetailShow.value = true;
};

const formatTimestamp = (timestamp) => {
	if (!timestamp) return '';
	const now = Date.now();
	const diff = (now - new Date(timestamp).getTime()) / 1000;
	if (diff < 60) return '刚刚';
	if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`;
	if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`;
	const date = new Date(timestamp);
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

// --- 生命周期函数 ---
onShow(() => {
	checkLoginStatus();
	handleRefresh();
	uni.$on('post-success', handleRefresh);
});

onHide(() => {
	uni.$off('post-success');
});

onPullDownRefresh(() => {
	handleRefresh();
});

onReachBottom(() => {
	if (hasMore.value) {
		page.value++;
		fetchPosts(true);
	}
});
</script>

<style lang="scss" scoped>
.page-container {
	background-color: #f3f4f6;
}
.tabs-container {
	background-color: #fff;
	position: sticky;
	top: 0;
	z-index: 9;
}
.loading-state, .empty-state {
	padding-top: 30vh;
	display: flex;
	justify-content: center;
}
.flex-grid-container {
	display: flex;
	flex-wrap: wrap;
	padding: 20rpx 10rpx;
	.post-card {
		width: calc(50% - 20rpx);
		margin: 10rpx;
		background-color: #fff;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
	}
}
.post-card {
	.card-content {
		padding: 20rpx;
	}
	.title {
		font-size: 28rpx;
		color: #333;
		font-weight: 500;
		margin-bottom: 16rpx;
	}
	.card-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.author-info {
		display: flex;
		align-items: center;
		.nickname {
			font-size: 24rpx;
			color: #666;
			margin-left: 10rpx;
		}
	}
	.like-section {
		display: flex;
		align-items: center;
		color: #666;
		.like-count {
			font-size: 24rpx;
			margin-left: 8rpx;
		}
	}
}
.fab-button {
	position: fixed;
	right: 40rpx;
	bottom: 120rpx;
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	background: linear-gradient(to right, #008585, #74a892);
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 8rpx 20rpx rgba(0, 133, 133, 0.4);
	z-index: 10;
}
.detail-popup-container {
	height: 90vh;
	background-color: #fcfaf2;
	display: flex;
	flex-direction: column;
	.popup-header {
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		font-size: 32rpx;
		font-weight: 500;
		border-bottom: 1rpx solid #f0f0f0;
		position: relative;
		flex-shrink: 0;
	}
	.close-btn {
		position: absolute;
		right: 30rpx;
		top: 50%;
		transform: translateY(-50%);
	}
	.popup-scroll-view {
		flex: 1;
		min-height: 0;
		.scroll-content-wrapper {
			padding: 30rpx;
			padding-bottom: 222rpx;
		}
	}
	.detail-author-info {
		display: flex;
		align-items: center;
		padding-bottom: 20rpx;
		.author-text {
			margin-left: 20rpx;
			.nickname { font-size: 30rpx; font-weight: 500; color: #333; }
			.post-time { font-size: 24rpx; color: #999; }
		}
	}
	.detail-content {
		.detail-title { font-size: 40rpx; font-weight: bold; color: #004343; margin-bottom: 20rpx; }
		.detail-desc { font-size: 28rpx; color: #555; line-height: 1.6; margin-bottom: 30rpx; }
		.detail-tag {
			display: inline-block;
			background-color: #e9e5d9;
			color: #5c5c5c;
			font-size: 24rpx;
			padding: 8rpx 20rpx;
			border-radius: 30rpx;
			margin-top: 30rpx;
		}
	}
	.comment-section {
		padding: 20rpx 0;
	}
	.comment-empty {
		padding: 40rpx 0;
	}
	.comment-list {
		.comment-item {
			display: flex;
			padding: 20rpx 0;
			border-bottom: 1rpx solid #f0f0f0;
			&:last-child {
				border-bottom: none;
			}
			.comment-body {
				flex: 1;
				margin-left: 20rpx;
				.comment-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.nickname { font-size: 26rpx; color: #666; }
					.time { font-size: 22rpx; color: #999; }
				}
				.content {
					font-size: 28rpx;
					color: #333;
					margin-top: 10rpx;
					word-break: break-all;
				}
			}
		}
	}
	.footer-wrapper {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 10;
		flex-shrink: 0;
		background-color: #fff;
	}
	.comment-input-bar {
		border-top: 1rpx solid #e2e2e2;
		padding: 20rpx;
		display: flex;
		align-items: center;
	}
	.detail-action-bar {
		height: 100rpx;
		border-top: 1rpx solid #f0f0f0;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding-bottom: env(safe-area-inset-bottom);
		.action-item {
			display: flex;
			align-items: center;
			color: #333;
			flex-direction: column;
			.action-text {
				font-size: 22rpx;
				margin-top: 4rpx;
			}
		}
	}
}
</style>
