<template>
	<view class="page-container">
		<scroll-view scroll-y class="scroll-view-container">
			<!-- 地址选择 -->
			<view class="card address-section" @click="selectAddress">
				<view v-if="!selectedAddress" class="no-address">
					<u-icon name="plus-circle" size="24" color="#c7522a"></u-icon>
					<text>请选择收货地址</text>
				</view>
				<view v-else class="address-info">
					<view class="address-line">
						{{ selectedAddress.region }} {{ selectedAddress.detail }}
					</view>
					<view class="user-line">
						<text>{{ selectedAddress.name }}</text>
						<text>{{ selectedAddress.phone }}</text>
					</view>
				</view>
				<u-icon name="arrow-right" color="#999" size="18"></u-icon>
			</view>

			<!-- 商品列表 -->
			<view class="card product-section">
				<view v-for="item in orderItems" :key="item.productId" class="product-item">
					<image class="product-image" :src="item.productDetails.coverImage" mode="aspectFill"></image>
					<view class="item-info">
						<view class="name u-line-2">{{ item.productDetails.name }}</view>
						<view class="spec">数量: {{ item.quantity }}</view>
					</view>
					<view class="price">¥{{ item.productDetails.price }}</view>
				</view>
			</view>

			<!-- 订单信息 -->
			<view class="card info-section">
				<view class="info-row">
					<text class="label">商品总额</text>
					<text class="value">¥{{ totalPrice.toFixed(2) }}</text>
				</view>
				<view class="info-row">
					<text class="label">运费</text>
					<text class="value">¥0.00</text>
				</view>
			</view>

		</scroll-view>
		
		<!-- 提交订单栏 -->
		<view class="submission-bar">
			<view class="total-section">
				<text>合计：</text>
				<text class="price-symbol">¥</text>
				<text class="price-amount">{{ totalPrice.toFixed(2) }}</text>
			</view>
			<u-button 
				type="primary" 
				:customStyle="submitBtnStyle" 
				text="提交订单"
				@click="submitOrder"
			></u-button>
		</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { getAddressesApi } from '@/api/address.js';
import { createOrderApi } from '@/api/market.js';

// --- 响应式变量 ---
const orderItems = ref([]);
const addressList = ref([]);
const selectedAddress = ref(null);
const userInfo = ref(null);
const isProcessing = ref(false); // 防止重复提交的锁

// --- 计算属性 ---
const submitBtnStyle = computed(() => ({
	background: 'linear-gradient(to right, #c7522a, #e5c185)',
	color: '#fff',
	border: 'none',
	width: '240rpx'
}));

const totalPrice = computed(() => {
	return orderItems.value.reduce((sum, item) => {
		return sum + (item.productDetails.price * item.quantity);
	}, 0);
});


const fetchAddresses = async () => {
	try {
		const res = await getAddressesApi({ userId: userInfo.value.id });
		if (res.addresses && res.addresses.length > 0) {
			addressList.value = res.addresses;
			// 优先选择默认地址，否则选择第一个地址
			selectedAddress.value = res.addresses.find(addr => addr.isDefault) || res.addresses[0];
		}
	} catch (error) {
		console.error("获取地址列表失败:", error);
	}
};

const submitOrder = async () => {
	if (!selectedAddress.value) {
		return uni.showToast({ title: '请选择收货地址', icon: 'none' });
	}
	if (isProcessing.value) return;

	isProcessing.value = true;

	const itemsToSubmit = orderItems.value.map(item => ({
		productId: item.productId,
		quantity: item.quantity,
		price: item.productDetails.price,
		name: item.productDetails.name,
		coverImage: item.productDetails.coverImage 
	}));

	const orderData = {
		userId: userInfo.value.id,
		items: itemsToSubmit,
		totalPrice: totalPrice.value,
		shippingAddress: selectedAddress.value 
	};

	try {
		await createOrderApi(orderData);
		
		uni.showToast({ title: '下单成功！即将跳转', icon: 'success' });

		uni.removeStorageSync('order_confirm_items');
		uni.removeStorageSync('selected_address');
		
		setTimeout(() => {
			uni.redirectTo({
				url: '/pages/order_list/order_list'
			});
		}, 1500);

	} catch (error) {
		console.error("提交订单失败:", error);
	} finally {
		isProcessing.value = false;
	}
};

// --- 页面逻辑与生命周期 ---
const selectAddress = () => {
	uni.navigateTo({
		url: '/pages/address_management/address_management?from=order_confirm'
	});
};

onLoad(() => {
	userInfo.value = uni.getStorageSync('user_info');
	const items = uni.getStorageSync('order_confirm_items');
	
	if (items && items.length > 0) {
		orderItems.value = items;
	} else {
		uni.showToast({ title: '没有待结算商品', icon: 'error', duration: 2000 });
		setTimeout(() => uni.navigateBack(), 2000);
		return;
	}
	
	if (userInfo.value) {
		fetchAddresses();
	}
});

onShow(() => {
	const newSelectedAddress = uni.getStorageSync('selected_address');
	if (newSelectedAddress) {
		selectedAddress.value = newSelectedAddress;
		uni.removeStorageSync('selected_address');
	}
});
</script>

<style lang="scss" scoped>
.page-container { background-color: #f3f4f6; height: 100vh; display: flex; flex-direction: column; }
.scroll-view-container { flex: 1; min-height: 0; padding-bottom: 120rpx; }
.card { background-color: #fff; border-radius: 16rpx; margin: 24rpx; padding: 30rpx; box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.04); }
.address-section { display: flex; align-items: center; justify-content: space-between; .no-address { display: flex; align-items: center; font-size: 30rpx; color: #c7522a; text { margin-left: 16rpx; } } .address-info { flex: 1; .address-line { font-size: 30rpx; font-weight: 500; margin-bottom: 10rpx; } .user-line { font-size: 26rpx; color: #666; text:first-child { margin-right: 20rpx; } } } }
.product-section { padding: 10rpx 30rpx; .product-item { display: flex; padding: 20rpx 0; border-bottom: 1rpx solid #f5f5f5; &:last-child { border-bottom: none; } .product-image { width: 140rpx; height: 140rpx; border-radius: 8rpx; flex-shrink: 0; } .item-info { flex: 1; margin: 0 20rpx; .name { font-size: 28rpx; } .spec { font-size: 24rpx; color: #999; margin-top: 10rpx; } } .price { font-size: 28rpx; font-weight: 500; } } }
.info-section { .info-row { display: flex; justify-content: space-between; font-size: 28rpx; padding: 10rpx 0; .label { color: #666; } .value { font-weight: 500; } } }
.submission-bar { position: fixed; bottom: 0; left: 0; right: 0; background-color: #fff; border-top: 1rpx solid #f0f0f0; display: flex; align-items: center; justify-content: space-between; padding: 15rpx 30rpx; padding-bottom: calc(15rpx + env(safe-area-inset-bottom)); z-index: 100; .total-section { display: flex; align-items: baseline; color: #c7522a; .price-symbol { font-size: 24rpx; } .price-amount { font-size: 36rpx; font-weight: bold; } } }
</style>
