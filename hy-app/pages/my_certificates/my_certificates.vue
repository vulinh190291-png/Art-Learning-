<template>
	<view class="page-container">
		<u-navbar title="我的证书" autoBack placeholder></u-navbar>
		
		<!-- 加载状态 -->
		<view v-if="isLoading" class="loading-state">
			<u-loading-icon mode="circle" size="30"></u-loading-icon>
		</view>
		<!-- 空状态 -->
		<view v-else-if="certificates.length === 0" class="empty-state">
			<u-empty mode="data" text="暂无已获得的证书" icon="/static/logo.png"></u-empty>
			<view class="tip-text">快去完成课程，点亮你的第一张证书吧！</view>
		</view>
		
		<!-- 证书列表 -->
		<view v-else class="certificate-list">
			<view v-for="cert in certificates" :key="cert.courseId" class="certificate-card" @click="viewCertificate(cert.courseId)">
				<image class="cover-image" :src="cert.coverImage" mode="aspectFill"></image>
				<view class="info-wrapper">
					<view class="title u-line-2">{{ cert.title }}</view>
					<view class="instructor">讲师：{{ cert.instructor }}</view>
					<view class="award-date">获得于：{{ formatDate(cert.awardDate) }}</view>
				</view>
				<view class="stamp">
					<image src="/static/images/badges/badge_diligent_student.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import dayjs from 'dayjs'; 
import { getCertificatesApi } from '@/api/course.js';

// --- 响应式变量 ---
const isLoading = ref(true);
const certificates = ref([]);
const userInfo = ref(null);

// --- API 调用函数 ---
const fetchCertificates = async () => {
	if (!userInfo.value?.id) {
		isLoading.value = false;
		return;
	}
	
	isLoading.value = true;
	try {
		const res = await getCertificatesApi({ userId: userInfo.value.id });
		certificates.value = res.certificates || [];
	} catch (error) {
		certificates.value = [];
		console.error("获取证书列表失败:", error);
	} finally {
		isLoading.value = false;
	}
};

// --- 辅助函数与事件处理 ---
const formatDate = (dateString) => {
	if (!dateString) return '未知日期';
	return dayjs(dateString).format('YYYY年MM月DD日');
};

const viewCertificate = (courseId) => {
	uni.navigateTo({
		url: `/pages/certificate/certificate?courseId=${courseId}`
	});
};

// --- 生命周期函数 ---
onShow(() => {
	userInfo.value = uni.getStorageSync('user_info');
	if (userInfo.value) {
		fetchCertificates();
	} else {
		isLoading.value = false;
		certificates.value = []; // 未登录时清空列表
		uni.showModal({
			title: '提示',
			content: '请先登录查看证书',
			showCancel: false,
			success: () => uni.switchTab({ url: '/pages/profile/profile' })
		});
	}
});
</script>

<style lang="scss" scoped>
.page-container {
	background-color: #f5f5f5;
	min-height: 100vh;
}
.loading-state, .empty-state {
	padding-top: 30vh;
	text-align: center;
}
.empty-state .tip-text {
	color: #999;
	font-size: 26rpx;
	margin-top: 20rpx;
}

.certificate-list {
	padding: 24rpx;
}
.certificate-card {
	background-color: #fff;
	border-radius: 16rpx;
	margin-bottom: 24rpx;
	box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.05);
	display: flex;
	padding: 20rpx;
	position: relative;
	overflow: hidden;
	border: 1rpx solid #f0daa5;

	.cover-image {
		width: 160rpx;
		height: 160rpx;
		border-radius: 12rpx;
		flex-shrink: 0;
		margin-right: 20rpx;
		background-color: #f0f0f0;
	}

	.info-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		flex: 1;
		.title {
			font-size: 30rpx;
			font-weight: bold;
			color: #333;
		}
		.instructor, .award-date {
			font-size: 24rpx;
			color: #999;
		}
	}

	.stamp {
		position: absolute;
		right: 20rpx;
		bottom: 20rpx;
		width: 100rpx;
		height: 100rpx;
		opacity: 0.15;
		image {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
