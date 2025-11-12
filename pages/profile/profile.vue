<template>
	<view class="page-container">
		<!-- 已登录状态 -->
		<template v-if="isLoggedIn">
			<view class="profile-header">
				<view class="avatar-wrapper">
					<image class="avatar" :src="userInfo.avatar" mode="aspectFill"></image>
				</view>
				<view class="info">
					<text class="nickname">{{ userInfo.nickname }}</text>
					<text class="bio">{{ userInfo.bio }}</text>
				</view>
			</view>

			<view class="action-list">
				<u-cell-group :border="false">
					<u-cell title="我的购物车" isLink url="/pages/cart/cart"></u-cell>
					<u-cell title="我的订单" isLink url="/pages/order_list/order_list"></u-cell>
					<u-cell title="我的收藏" isLink url="/pages/my_collections/my_collections"></u-cell>
					<u-cell title="编辑资料" isLink url="/pages/profile_edit/profile_edit"></u-cell>
					<u-cell title="我的成就" isLink url="/pages/achievements/achievements"></u-cell>
					<u-cell title="地址管理" isLink url="/pages/address_management/address_management"></u-cell>
					<u-cell title="我的证书" isLink url="/pages/my_certificates/my_certificates"></u-cell>
				</u-cell-group>
			</view>
			<view class="logout-btn-wrapper">
				<u-button
					text="退出登录"
					type="error"
					plain
					:customStyle="{borderRadius: '45rpx'}"
					@click="logout"
				></u-button>
			</view>
		</template>
		
		<!-- 未登录状态 -->
		<template v-else>
			<view class="login-prompt">
				<image class="placeholder-img" src="/static/logo.png" @click="goToLogin"></image>
				<view class="prompt-text">登录绘影，开启你的艺术之旅</view>
				<u-button
					text="登录 / 注册"
					size="large"
					:customStyle="loginBtnStyle"
					@click="goToLogin"
				></u-button>
			</view>
		</template>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onShow } from '@dcloudio/uni-app';

// --- 响应式变量 ---
const isLoggedIn = ref(false);
const userInfo = ref({});

// --- 计算属性 ---
const loginBtnStyle = computed(() => ({
	background: 'linear-gradient(to right, #008585, #004343)',
	color: '#fff',
	marginTop: '40rpx',
	width: '500rpx',
	height: '90rpx',
	borderRadius: '45rpx',
	border: 'none'
}));

// --- 页面逻辑与事件处理 ---

/**
 * @description 检查本地存储，更新用户登录状态和信息
 */
const checkLoginStatus = () => {
	const storedUser = uni.getStorageSync('user_info');
	if (storedUser && storedUser.id) {
		userInfo.value = storedUser;
		// 如果用户没有头像，提供一个默认头像
		if (!userInfo.value.avatar) {
			userInfo.value.avatar = '/static/logo.png';
		}
		isLoggedIn.value = true;
	} else {
		isLoggedIn.value = false;
		userInfo.value = {};
	}
};

/**
 * @description 跳转到登录页面
 */
const goToLogin = () => {
	uni.navigateTo({ url: '/pages/login/login' });
};

/**
 * @description 退出登录
 */
const logout = () => {
	uni.showModal({
		title: '提示',
		content: '确定要退出登录吗？',
		success: (res) => {
			if (res.confirm) {
				// 清除本地存储的用户信息
				uni.removeStorageSync('user_info');
				checkLoginStatus();
				uni.showToast({ title: '已退出登录', icon: 'success' });
			}
		}
	});
};

// --- 生命周期函数 ---

/**
 * @description 每次进入页面时（包括从其他页面返回），都检查登录状态。
 */
onShow(() => {
	checkLoginStatus();
});
</script>

<style lang="scss" scoped>
.page-container {
	background-color: #f8f8f8;
	min-height: 100vh;
}
.login-prompt {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-top: 200rpx;
	.placeholder-img {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		margin-bottom: 40rpx;
	}
	.prompt-text {
		font-size: 30rpx;
		color: #666;
		margin-bottom: 40rpx;
	}
}
.profile-header {
	display: flex;
	align-items: center;
	padding: 40rpx;
	background: linear-gradient(135deg, #fdf8e4, #e5c185);
	.avatar-wrapper {
		position: relative;
		.avatar {
			width: 140rpx;
			height: 140rpx;
			border-radius: 50%;
			border: 4rpx solid #fff;
		}
	}
	.info {
		margin-left: 30rpx;
		display: flex;
		flex-direction: column;
		.nickname {
			font-size: 40rpx;
			font-weight: bold;
			color: #004343;
		}
		.bio {
			font-size: 26rpx;
			color: #666;
			margin-top: 10rpx;
		}
	}
}
.action-list {
	margin: 20rpx 0;
}
.logout-btn-wrapper {
	padding: 40rpx;
}
</style>
