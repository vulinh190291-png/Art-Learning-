<template>
	<view class="page-container">
		<view class="certificate-wrapper">
			<view class="cert-header">
				<image class="logo" src="/static/logo.png" mode="aspectFit"></image>
				<view class="app-title">绘影</view>
			</view>
			<view class="cert-title">结 业 证 书</view>
			<view class="cert-body">
				<text class="congrats-text">兹证明</text>
				<view class="student-name">{{ userInfo.nickname || '同学' }}</view>
				<view class="cert-text">
					于 {{ awardDate }} 完成了
					<text class="course-name">《{{ course.title || '课程' }}》</text>
					课程的全部学习内容，特发此证，以资鼓励。
				</view>
			</view>
			<view class="cert-footer">
				<view class="issuer">绘影 · 线上课堂</view>
				<view class="date">{{ issueDate }}</view>
			</view>
			<image class="stamp" src="https://gitee.com/crazybox/community/raw/master/system/stamp.png" mode="aspectFit"></image>
		</view>
		<view class="action-button-wrapper">
			<u-button type="primary" :customStyle="shareBtnStyle" text="分享我的证书"></u-button>
		</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getCourseDetailApi, getCourseProgressApi } from '@/api/course.js';

const userInfo = ref({});
const course = ref({});
const progress = ref({});

const awardDate = computed(() => {
	if (!progress.value.awardDate) return 'YYYY年MM月DD日';
	const date = new Date(progress.value.awardDate);
	return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
});

const issueDate = computed(() => awardDate.value);

const shareBtnStyle = computed(() => ({
	background: 'linear-gradient(to right, #008585, #74a892)',
	color: '#fff',
	border: 'none'
}));

onLoad(async (options) => {
	const courseId = options.courseId;
	userInfo.value = uni.getStorageSync('user_info') || {};

	if (!courseId || !userInfo.value.id) {
		return;
	}

	try {
		const [courseRes, progressRes] = await Promise.all([
			getCourseDetailApi(courseId),
			getCourseProgressApi({ userId: userInfo.value.id, courseId: courseId })
		]);
		
		// 直接使用返回的业务数据进行赋值
		course.value = courseRes.course || {};
		progress.value = progressRes.progress || {};

	} catch (error) {
		// 错误提示已由拦截器处理，这里仅在控制台记录
		console.error("加载证书数据失败:", error);
		// 可以在这里设置一些默认值或错误状态
		course.value = { title: '未知课程' };
		progress.value = {};
	}
});
</script>

<style lang="scss" scoped>
.page-container {
	padding: 50rpx 30rpx;
	background-color: #f3f4f6;
}
.certificate-wrapper {
	background-color: #fdfaf2;
	border: 2rpx solid #e5c185;
	padding: 40rpx;
	box-shadow: 0 8rpx 30rpx rgba(0,0,0,0.08);
	position: relative;
	overflow: hidden;
}
.cert-header {
	display: flex;
	flex-direction: column;
	align-items: center;
	.logo { width: 100rpx; height: 100rpx; }
	.app-title { font-size: 40rpx; font-weight: bold; color: #004343; margin-top: 10rpx; }
}
.cert-title {
	font-size: 52rpx;
	text-align: center;
	margin: 40rpx 0;
	font-weight: 600;
	color: #c7522a;
	letter-spacing: 10rpx;
}
.cert-body {
	font-size: 30rpx;
	line-height: 1.8;
	color: #333;
	.congrats-text { display: block; margin-bottom: 20rpx; }
	.student-name { font-size: 36rpx; font-weight: bold; color: #004343; margin-bottom: 20rpx; }
	.course-name { color: #008585; font-weight: bold; }
}
.cert-footer {
	margin-top: 80rpx;
	text-align: right;
	font-size: 28rpx;
	color: #666;
	.issuer { margin-bottom: 10rpx; }
}
.stamp {
	position: absolute;
	right: 40rpx;
	bottom: 80rpx;
	width: 180rpx;
	height: 180rpx;
	opacity: 0.8;
}
.action-button-wrapper {
	margin-top: 60rpx;
}
</style>
