<template>
	<view class="page-container">
		<!-- 加载状态 -->
		<view v-if="isLoading" class="loading-state">
			<u-loading-icon mode="circle" size="30"></u-loading-icon>
		</view>
		<!-- 空状态/错误状态 -->
		<view v-else-if="!course" class="empty-state">
			<u-empty mode="data" text="课程信息加载失败"></u-empty>
		</view>
		<!-- 页面内容 -->
		<template v-else>
			<scroll-view scroll-y class="scroll-view-container">
				<!-- 封面 -->
				<view class="cover-section">
					<image class="cover-image" :src="course.coverImage" mode="aspectFit"></image>
					<view class="cover-overlay">
						<view class="title">{{ course.title }}</view>
						<view class="instructor">{{ course.instructor }}</view>
					</view>
				</view>
	
				<!-- 基础信息 -->
				<view class="info-section card">
					<view class="info-item">
						<text class="label">价格</text>
						<text class="value price" :class="{ 'free': course.type === 'free' }">{{ course.type === 'free' ? '免费' : `¥ ${course.price}` }}</text>
					</view>
					<view class="info-item">
						<text class="label">学习人数</text>
						<text class="value">{{ course.studentCount }}</text>
					</view>
				</view>
	
				<!-- 详情和讲师介绍 -->
				<view class="detail-section card">
					<u-tabs :list="tabList" @click="onTabClick" :current="currentTab" :activeStyle="{ color: '#008585', fontWeight: 'bold' }"></u-tabs>
					<view v-if="currentTab === 0" class="tab-content">
						<view class="description">{{ course.description }}</view>
						<u-divider text="课程大纲"></u-divider>
						<view v-for="item in course.outline" :key="item.id" class="outline-item">
							<u-icon name="file-text" size="18" color="#008585"></u-icon>
							<text>{{ item.title }}</text>
						</view>
					</view>
					<view v-if="currentTab === 1" class="tab-content">
						<view class="instructor-info">
							<u--image :src="course.instructorInfo.avatar" width="120rpx" height="120rpx" shape="circle"></u--image>
							<view class="name">{{ course.instructorInfo.name }}</view>
							<view class="title-tag">{{ course.instructorInfo.title }}</view>
							<view class="bio">{{ course.instructorInfo.bio }}</view>
						</view>
					</view>
				</view>
			</scroll-view>

			<!-- 底部操作栏 -->
			<view class="action-bar">
				<u-button type="primary" :customStyle="actionBtnStyle" text="立即学习" @click="startLearning"></u-button>
			</view>
		</template>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getCourseDetailApi } from '@/api/course.js';

const course = ref(null);
const isLoading = ref(true);
const courseId = ref(null);
const tabList = ref([{ name: '课程详情' }, { name: '讲师介绍' }]);
const currentTab = ref(0);

const actionBtnStyle = computed(() => ({
	background: 'linear-gradient(to right, #008585, #004343)',
	color: '#fff',
	height: '90rpx',
	borderRadius: '45rpx',
	border: 'none'
}));

const onTabClick = (item) => {
	currentTab.value = item.index;
};

const startLearning = () => {
	uni.navigateTo({
		url: `/pages/learning_player/learning_player?id=${courseId.value}`
	});
};

const fetchCourseDetail = async () => {
	if (!courseId.value) return;
	isLoading.value = true;
	try {
		const res = await getCourseDetailApi(courseId.value);
		// 直接使用返回的业务数据进行赋值
		course.value = res.course;
	} catch (error) {
		// 错误提示由拦截器处理，这里仅作降级和调试
		course.value = null;
		console.error("获取课程详情失败:", error);
	} finally {
		isLoading.value = false;
	}
};

// --- 生命周期函数 ---
onLoad((options) => {
	courseId.value = options.id;
	fetchCourseDetail();
});
</script>

<style lang="scss" scoped>
.page-container {
	background-color: #f3f4f6;
	min-height: 100vh;
}
.card { background-color: #fff; border-radius: 16rpx; margin: 24rpx; padding: 30rpx; box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.04); }
.loading-state, .empty-state {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80vh;
}
.scroll-view-container {
	height: calc(100vh - 120rpx - env(safe-area-inset-bottom));
}

.cover-section {
	position: relative;
	height: 600rpx;
	background-color: #f0f0f0;
	.cover-image { width: 100%; height: 100%; }
	.cover-overlay {
		position: absolute; bottom: 0; left: 0; right: 0; padding: 60rpx 30rpx 30rpx;
		color: #fff; background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
		.title { font-size: 40rpx; font-weight: bold; margin-bottom: 10rpx; }
		.instructor { font-size: 28rpx; }
	}
}
.info-section {
	display: flex; justify-content: space-around; margin-top: -50rpx; position: relative; z-index: 2;
	.info-item {
		display: flex; flex-direction: column; align-items: center;
		.label { font-size: 24rpx; color: #999; margin-bottom: 8rpx; }
		.value { font-size: 32rpx; font-weight: bold; color: #333; }
		.price { color: #c7522a; &.free { color: #008585; } }
	}
}
.detail-section {
	.tab-content { padding-top: 30rpx; }
	.description { font-size: 28rpx; color: #555; line-height: 1.7; margin-bottom: 30rpx; }
	.outline-item {
		display: flex; align-items: center; padding: 20rpx 0; font-size: 28rpx;
		color: #333; border-bottom: 1rpx solid #f0f0f0;
		text { margin-left: 20rpx; }
		&:last-child { border-bottom: none; }
	}
	.instructor-info {
		display: flex; flex-direction: column; align-items: center; padding: 40rpx 0;
		.name { font-size: 32rpx; font-weight: bold; margin: 20rpx 0 10rpx; }
		.title-tag { background-color: #e9e5d9; color: #5c5c5c; padding: 4rpx 16rpx; border-radius: 20rpx; font-size: 22rpx; margin-bottom: 20rpx; }
		.bio { font-size: 26rpx; color: #666; line-height: 1.6; text-align: center; }
	}
}
.action-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #fff;
	border-top: 1rpx solid #f0f0f0;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 15rpx 30rpx;
	padding-bottom: calc(15rpx + env(safe-area-inset-bottom));
}
</style>
