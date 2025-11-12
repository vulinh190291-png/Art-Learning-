<template>
	<view class="page-container">
		<view class="form-card">
			<!-- 头像上传 -->
			<view class="avatar-section" @click="changeAvatar">
				<u-avatar :src="form.avatar" size="80"></u-avatar>
				<view class="camera-mask">
					<u-icon name="camera-fill" color="#fff" size="24"></u-icon>
				</view>
			</view>
			<text class="avatar-tip">点击更换头像</text>

			<!-- 表单 -->
			<u--form :model="form" labelPosition="left" labelWidth="70">
				<u-form-item label="昵称" prop="nickname" borderBottom required>
					<u--input v-model="form.nickname" placeholder="请输入昵称" border="none" inputAlign="right"></u--input>
				</u-form-item>
				<u-form-item label="个人简介" prop="bio" labelPosition="top">
					<u--textarea v-model="form.bio" placeholder="介绍一下自己吧" count maxlength="100" height="80"></u--textarea>
				</u-form-item>
			</u--form>
		</view>
		
		<!-- 保存按钮 -->
		<view class="save-button-wrapper">
			<u-button type="primary" :customStyle="saveBtnStyle" text="保 存" @click="saveProfile" :loading="isProcessing"></u-button>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { updateProfileApi } from '@/api/user.js';

// --- 响应式变量 ---
const userInfo = ref({});
const isProcessing = ref(false); // 防止重复提交的锁
const form = reactive({
	avatar: '/static/logo.png',
	nickname: '',
	bio: ''
});

// --- 计算属性 ---
const saveBtnStyle = computed(() => ({
	background: 'linear-gradient(to right, #008585, #74a892)',
	color: '#fff',
	border: 'none',
	height: '90rpx',
	borderRadius: '45rpx'
}));


/**
 * @description 更换头像，使用 uni.uploadFile 处理文件上传
 */
const changeAvatar = () => {
	uni.chooseImage({
		count: 1,
		sizeType: ['compressed'],
		sourceType: ['album', 'camera'],
		success: (res) => {
			const tempFilePath = res.tempFilePaths[0];
			uni.showLoading({ title: '上传中...' });
			
			let uploadResult = { success: false, message: '上传失败' };

			uni.uploadFile({
				url: 'http://localhost:3000/api/upload-avatar',
				filePath: tempFilePath,
				name: 'avatar',
				formData: { 'userId': userInfo.value.id },
				success: (uploadRes) => {
					try {
						const data = JSON.parse(uploadRes.data);
						if (data.success) {
							uploadResult = { success: true, message: '头像更新成功', avatarUrl: data.avatarUrl };
						} else {
							uploadResult.message = data.message || '上传失败';
						}
					} catch(e) {
						console.error("解析头像上传响应失败:", e);
						uploadResult.message = '服务器响应格式错误';
					}
				},
				fail: (err) => {
					console.error("头像上传请求失败:", err);
					uploadResult.message = '网络请求失败';
				},
				complete: () => {
					uni.hideLoading();
					if (uploadResult.success) {
						// 更新本地缓存和当前表单
						userInfo.value.avatar = uploadResult.avatarUrl;
						form.avatar = uploadResult.avatarUrl;
						uni.setStorageSync('user_info', userInfo.value);
						uni.showToast({ title: uploadResult.message, icon: 'success' });
					} else {
						uni.showToast({ title: uploadResult.message, icon: 'error' });
					}
				}
			});
		}
	});
};

/**
 * @description 保存用户昵称和简介
 */

const saveProfile = async () => {
	if (!form.nickname.trim()) {
		return uni.showToast({ title: '昵称不能为空', icon: 'none' });
	}
	if (isProcessing.value) return;

	isProcessing.value = true;

	try {
		const res = await updateProfileApi({
			userId: userInfo.value.id,
			nickname: form.nickname,
			bio: form.bio
		});

		// 成功后，用后端返回的最新用户信息更新本地缓存
		uni.setStorageSync('user_info', res.user);
		uni.showToast({ title: '保存成功', icon: 'success' });
		
		setTimeout(() => {
			uni.navigateBack();
		}, 1000);

	} catch (error) {
		console.error("保存资料失败:", error);
		// 错误提示由拦截器处理
	} finally {
		isProcessing.value = false;
	}
};

// --- 生命周期函数 ---
onShow(() => {
	const user = uni.getStorageSync('user_info');
	if (user) {
		userInfo.value = user;
		form.avatar = user.avatar || '/static/logo.png';
		form.nickname = user.nickname || '';
		form.bio = user.bio || '';
	} else {
		uni.navigateBack();
	}
});
</script>

<style lang="scss" scoped>
.page-container {
	background-color: #f3f4f6;
	min-height: 100vh;
	padding: 24rpx;
}
.form-card {
	background-color: #fff;
	border-radius: 16rpx;
	padding: 40rpx 30rpx;
}
.avatar-section {
	position: relative;
	width: 160rpx;
	height: 160rpx;
	margin: 0 auto;
	
	.camera-mask {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 50rpx;
		height: 50rpx;
		background-color: rgba(0, 0, 0, 0.4);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2rpx solid #fff;
	}
}
.avatar-tip {
	display: block;
	text-align: center;
	font-size: 24rpx;
	color: #999;
	margin-top: 16rpx;
	margin-bottom: 40rpx;
}
.save-button-wrapper {
	margin-top: 60rpx;
}
</style>
