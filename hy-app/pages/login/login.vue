<template>
	<view class="page-container">
		<view class="logo-container">
			<image class="logo" src="/static/logo.png"></image>
			<view class="app-name">绘影</view>
			<view class="app-desc">传承东方之美</view>
		</view>
		<view class="form-container">
			<u--form labelPosition="left" :model="form" ref="loginForm">
				<u-form-item labelWidth="0">
					<u-input v-model="form.username" placeholder="请输入用户名" prefixIcon="account-fill" clearable>
					</u-input>
				</u-form-item>
				<u-form-item labelWidth="0">
					<u-input v-model="form.password" type="password" placeholder="请输入密码" prefixIcon="lock-fill" clearable>
					</u-input>
				</u-form-item>
			</u--form>
			<u-button
				text="登 录"
				size="large"
				:customStyle="loginBtnStyle"
				@click="submit"
			></u-button>
			<view class="extra-links">
				<text class="link" @click="goToRegister">注册账号</text>
				<text class="link">忘记密码?</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { reactive, computed, ref } from 'vue';
import { loginApi } from '@/api/user.js';

const isProcessing = ref(false);

const form = reactive({
	username: 'zhangsan',
	password: '123',
});

const loginBtnStyle = computed(() => ({
	background: 'linear-gradient(to right, #008585, #004343)',
	color: '#fff',
	marginTop: '40rpx',
	height: '90rpx',
	borderRadius: '45rpx',
	border: 'none'
}));

const submit = async () => {
	if (isProcessing.value) return;

	if (!form.username || !form.password) {
		uni.showToast({ title: '请输入用户名和密码', icon: 'none' });
		return;
	}
    
    isProcessing.value = true;
	
	try {

		const res = await loginApi(form);

		uni.setStorageSync('user_info', res.user);
		setTimeout(() => {
			uni.navigateBack();
		}, 800);

	} catch (error) {
		console.error("登录失败:", error);
	} finally {
		isProcessing.value = false;
	}
};

const goToRegister = () => {
	uni.navigateTo({
		url: '/pages/register/register'
	});
};
</script>

<style lang="scss" scoped>
.page-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	padding: 0 60rpx;
	background: linear-gradient(180deg, #fdf8e4, #f0e9d6);
}
.logo-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 80rpx;
	.logo {
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
		box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);
	}
	.app-name {
		font-size: 52rpx;
		font-weight: bold;
		color: #004343;
		margin-top: 20rpx;
	}
	.app-desc {
		font-size: 28rpx;
		color: #74a892;
	}
}
.form-container {
	width: 100%;
	::v-deep .u-input {
		background-color: #fff !important;
		padding: 10rpx 20rpx !important;
		border-radius: 16rpx !important;
	}
}
.extra-links {
	display: flex;
	justify-content: space-between;
	margin-top: 30rpx;
	.link {
		font-size: 26rpx;
		color: #008585;
	}
}
</style>
