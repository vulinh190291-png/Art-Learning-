<template>
	<view class="page-container">
		<view class="form-wrapper">
			<view class="title">创建您的绘影账号</view>
			<u--form labelPosition="top" :model="form" ref="formRef">
				<u-form-item>
					<u-input v-model="form.nickname" placeholder="请输入昵称" border="bottom" clearable></u-input>
				</u-form-item>
				<u-form-item>
					<u-input v-model="form.username" placeholder="请输入用户名 (用于登录)" border="bottom" clearable></u-input>
				</u-form-item>
				<u-form-item>
					<u-input v-model="form.password" type="password" placeholder="请输入密码" border="bottom" clearable></u-input>
				</u-form-item>
				<u-form-item>
					<u-input v-model="form.confirmPassword" type="password" placeholder="请再次确认密码" border="bottom" clearable></u-input>
				</u-form-item>
			</u--form>
			<u-button
				text="注 册"
				size="large"
				:customStyle="registerBtnStyle"
				@click="handleRegister"
				:loading="isProcessing"
			></u-button>
			<view class="login-link" @click="goBackToLogin">
				已有账号？<text>立即登录</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { reactive, computed, ref } from 'vue';
// 【核心改动1】从 api/user.js 引入注册函数
import { registerApi } from '@/api/user.js';

// --- 响应式变量 ---
const form = reactive({
	nickname: '',
	username: '',
	password: '',
	confirmPassword: ''
});
const isProcessing = ref(false); // 防止重复提交的锁

// --- 计算属性 ---
const registerBtnStyle = computed(() => ({
	background: 'linear-gradient(to right, #008585, #004343)',
	color: '#fff',
	marginTop: '60rpx',
	height: '90rpx',
	borderRadius: '45rpx',
	border: 'none'
}));

const handleRegister = async () => {
	// 表单验证
	if (!form.nickname || !form.username || !form.password) {
		return uni.showToast({ title: '请填写所有必填项', icon: 'none' });
	}
	if (form.password !== form.confirmPassword) {
		return uni.showToast({ title: '两次输入的密码不一致', icon: 'none' });
	}
	if (isProcessing.value) return;

	isProcessing.value = true;

	try {
		// 调用封装好的API
		await registerApi({
			username: form.username,
			password: form.password,
			nickname: form.nickname
		});
		
		uni.showToast({ title: '注册成功！即将跳转登录', icon: 'success' });
		
		setTimeout(() => {
			uni.navigateBack();
		}, 1500);

	} catch (error) {
		console.error("注册失败:", error);
		// 失败提示已由拦截器处理
	} finally {
		isProcessing.value = false;
	}
};

const goBackToLogin = () => {
	uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.page-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 80rpx 60rpx;
	min-height: 100vh;
	background-color: #f7f3e9;
}
.form-wrapper {
	width: 100%;
	.title {
		font-size: 44rpx;
		font-weight: bold;
		color: #004343;
		margin-bottom: 60rpx;
	}
}
.login-link {
	margin-top: 40rpx;
	text-align: center;
	font-size: 26rpx;
	color: #999;
	text {
		color: #008585;
	}
}
</style>
