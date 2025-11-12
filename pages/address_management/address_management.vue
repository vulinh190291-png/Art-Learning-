<template>
	<view class="page-container">
		<view v-if="isLoading" class="loading-state">
			<u-loading-icon mode="circle" size="30"></u-loading-icon>
		</view>

		<view v-if="!isLoading && addressList.length === 0" class="empty-state">
			<u-empty mode="address" text="还没有收货地址，快添加一个吧"></u-empty>
		</view>

		<scroll-view v-show="!isLoading && addressList.length > 0" scroll-y class="address-list">
			<view v-for="item in addressList" :key="item.id" class="address-card">
				<view class="info-section" @click="selectAddressForOrder(item)">
					<view class="user-line">
						<text class="name">{{ item.name }}</text>
						<text class="phone">{{ item.phone }}</text>
					</view>
					<view class="address-line">
						<text class="text">{{ item.region }} {{ item.detail }}</text>
					</view>
					<view v-if="item.isDefault" class="default-tag-corner">
						<text>默认</text>
					</view>
				</view>
				
				<u-line color="#f5f5f5" margin="0 30rpx"></u-line>
				
				<view class="action-section">
					<view class="radio-wrapper" @click="setDefault(item)">
						<view v-if="item.isDefault" class="custom-radio-checked">
							<u-icon name="checkmark" color="#fff" size="12"></u-icon>
						</view>
						<view v-else class="custom-radio"></view>
						<text class="radio-text">默认地址</text>
					</view>
					<view class="buttons">
						<view class="btn-item" @click="editAddress(item)">
							<u-icon name="edit-pen" color="#666" size="20"></u-icon>
							<text>编辑</text>
						</view>
						<view class="btn-item" @click="deleteAddress(item)">
							<u-icon name="trash" color="#666" size="20"></u-icon>
							<text>删除</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		
		<view class="bottom-button">
			<u-button type="primary" :customStyle="addBtnStyle" text="新增收货地址" @click="goToAddAddress"></u-button>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { getAddressesApi, deleteAddressApi, setDefaultAddressApi } from '@/api/address.js';

// --- 变量声明 ---
const addressList = ref([]);
const userInfo = ref(null);
const isLoading = ref(true);
const isProcessing = ref(false); 
const pageSource = ref(''); // 记录从哪个页面跳转而来
const addBtnStyle = { background: 'linear-gradient(to right, #c7522a, #e5c185)', color: '#fff', border: 'none', height: '90rpx' };

// --- 生命周期函数 ---
onLoad((options) => {
	if (options.from) {
		pageSource.value = options.from;
	}
});

onShow(() => {
	userInfo.value = uni.getStorageSync('user_info');
	fetchAddressList();
});

const fetchAddressList = async () => {
	if (!userInfo.value?.id) {
		isLoading.value = false;
		addressList.value = [];
		return;
	}
	isLoading.value = true;
	try {
		const res = await getAddressesApi({ userId: userInfo.value.id });
		addressList.value = res.addresses || [];
	} catch (error) {
		addressList.value = [];
		console.error("获取地址列表失败:", error);
	} finally {
		isLoading.value = false;
	}
};

const deleteAddress = (address) => {
	if (isProcessing.value) return;
	
	uni.showModal({
		title: '确认删除',
		content: '确定要删除这个地址吗？',
		success: async (res) => {
			if (res.confirm) {
				isProcessing.value = true;
				try {
					await deleteAddressApi(address.id, { userId: userInfo.value.id });
					await fetchAddressList();
				} catch (error) {
					console.error("删除地址失败:", error);
				} finally {
					isProcessing.value = false;
				}
			}
		}
	});
};

const setDefault = async (address) => {
	if (isProcessing.value || address.isDefault) return;
	
	isProcessing.value = true;
	try {
		await setDefaultAddressApi(address.id, { userId: userInfo.value.id });
		// 成功提示由拦截器处理
		await fetchAddressList();
	} catch (error) {
		console.error("设置默认地址失败:", error);
	} finally {
		isProcessing.value = false;
	}
};


const goToAddAddress = () => {
	uni.navigateTo({ url: '/pages/address_edit/address_edit' });
};

const editAddress = (address) => {
	uni.navigateTo({ url: `/pages/address_edit/address_edit?addressData=${encodeURIComponent(JSON.stringify(address))}` });
};

const selectAddressForOrder = (address) => {
	if (pageSource.value === 'order_confirm') {
		uni.setStorageSync('selected_address', address);
		uni.navigateBack();
	}
};
</script>

<style lang="scss" scoped>
.page-container {
	background-color: #f3f4f6;
	min-height: 100vh;
	padding-bottom: 160rpx;
}
.loading-state {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(255, 255, 255, 0.8);
	z-index: 99;
}
.empty-state {
	padding-top: 30vh;
}
.address-list {
	padding: 24rpx;
}
.address-card {
	background-color: #fff;
	border-radius: 16rpx;
	margin-bottom: 24rpx;
	box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.05);
	position: relative;
	overflow: hidden;

	.info-section {
		padding: 30rpx;
		.user-line {
			display: flex;
			align-items: baseline;
			margin-bottom: 16rpx;
			.name {
				font-size: 32rpx;
				font-weight: 500;
				color: #333;
			}
			.phone {
				font-size: 28rpx;
				color: #666;
				margin-left: 20rpx;
			}
		}
		.address-line {
			font-size: 28rpx;
			color: #555;
			line-height: 1.6;
			padding-right: 100rpx; 
		}
	}

	.default-tag-corner {
		position: absolute;
		top: 0;
		right: 0;
		background: #008585;
		color: #fff;
		font-size: 22rpx;
		padding: 6rpx 20rpx 8rpx 24rpx;
		border-bottom-left-radius: 16rpx;
	}

	.action-section {
		padding: 20rpx 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 26rpx;
		
		.radio-wrapper {
			display: flex;
			align-items: center;
			color: #666;
			.radio-text {
				margin-left: 10rpx;
			}
		}

		.buttons {
			display: flex;
			align-items: center;
			color: #666;
			.btn-item {
				display: flex;
				align-items: center;
				margin-left: 40rpx;
				text {
					margin-left: 8rpx;
				}
			}
		}
	}
}

.custom-radio {
	width: 20px;
	height: 20px;
	border-radius: 50%;
	border: 1px solid #cccccc;
	box-sizing: border-box;
}
.custom-radio-checked {
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: #008585;
	display: flex;
	justify-content: center;
	align-items: center;
}

.bottom-button {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 20rpx 40rpx;
	background: #fff;
	border-top: 1rpx solid #f0f0f0;
	padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
}
</style>
