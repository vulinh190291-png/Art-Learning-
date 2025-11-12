<template>
	<view class="page-container">
		<view v-if="isLoading" class="loading-state">
			<u-loading-icon mode="circle" size="30"></u-loading-icon>
		</view>

		<view v-if="!isLoading && (!cart || cart.items.length === 0)" class="empty-state">
			<u-empty mode="car" text="购物车还是空的"></u-empty>
		</view>

		<view class="cart-content-wrapper" v-show="!isLoading && cart && cart.items.length > 0">
			<scroll-view scroll-y class="scroll-view-container">
				<view v-for="item in cart.items" :key="item.productId" class="cart-item card">
					<!-- 有效商品 -->
					<template v-if="item.productDetails">
						<image class="product-image" :src="item.productDetails.coverImage" mode="aspectFill"></image>
						<view class="item-info">
							<view class="name u-line-2">{{ item.productDetails.name }}</view>
							<view class="price-stepper">
								<view class="price">¥{{ item.productDetails.price }}</view>
								<u-number-box 
									v-model="item.quantity" 
									@change="onQuantityChange($event, item.productId)"
								></u-number-box>
							</view>
						</view>
						<view class="delete-btn" @click="removeItem(item.productId)">
							<u-icon name="trash" color="#999" size="20"></u-icon>
						</view>
					</template>
	
					<view v-else class="invalid-item">
						<text class="invalid-text">该商品已失效</text>
						<view class="delete-btn" @click="removeItem(item.productId)">
							<text>删除</text>
						</view>
					</view>
				</view>
			</scroll-view>
			
			<view class="checkout-bar">
				<view class="total-price">
					<text>合计：</text>
					<text class="price-symbol">¥</text>
					<text class="price-amount">{{ totalPrice }}</text>
				</view>
				<u-button 
					type="primary" 
					:customStyle="checkoutBtnStyle" 
					text="去结算" 
					@click="goToConfirmOrder"
				></u-button>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { getCartApi, updateCartApi, removeFromCartApi } from '@/api/market.js';

const cart = ref({ items: [] });
const isLoading = ref(true);
const userInfo = ref(null);

const checkoutBtnStyle = computed(() => ({
	background: 'linear-gradient(to right, #c7522a, #e5c185)',
	color: '#fff',
	border: 'none'
}));

const totalPrice = computed(() => {
	if (!cart.value || !cart.value.items) return '0.00';
	return cart.value.items.reduce((sum, item) => {
		if (item.productDetails) {
			return sum + (item.productDetails.price * item.quantity);
		}
		return sum;
	}, 0).toFixed(2);
});

// --- API 调用函数 ---
const fetchCart = async () => {
	isLoading.value = true;
	try {
		const res = await getCartApi({ userId: userInfo.value.id });
		cart.value = res.cart || { items: [] };
	} catch (error) {
		cart.value = { items: [] };
		console.error("获取购物车失败:", error);
	} finally {
		isLoading.value = false;
	}
};

const onQuantityChange = async (e, productId) => {
	try {
		await updateCartApi({ 
			userId: userInfo.value.id, 
			productId: productId, 
			quantity: e.value 
		});
	} catch (error) {
		console.error("更新购物车数量失败:", error);
	}
};

const removeItem = (productId) => {
	uni.showModal({
		title: '提示',
		content: '确定要从购物车移除该商品吗？',
		success: async (res) => {
			if(res.confirm) {
				try {
					await removeFromCartApi({ 
						userId: userInfo.value.id, 
						productId: productId 
					});
					fetchCart();
				} catch (error) {
					console.error("移除商品失败:", error);
				}
			}
		}
	});
};


const goToConfirmOrder = () => {
	const validItems = cart.value.items.filter(item => item.productDetails);
	if (validItems.length === 0) {
		uni.showToast({ title: '购物车没有有效商品', icon: 'none' });
		return;
	}
	uni.setStorageSync('order_confirm_items', validItems);
	uni.navigateTo({ url: '/pages/order_confirm/order_confirm' });
};

onShow(() => {
	userInfo.value = uni.getStorageSync('user_info');
	if (!userInfo.value) {
		isLoading.value = false;
		cart.value = { items: [] };
		uni.showModal({
			title: '提示',
			content: '请先登录',
			showCancel: false,
			success: () => uni.switchTab({ url: '/pages/profile/profile' })
		});
	} else {
		fetchCart();
	}
});
</script>

<style lang="scss" scoped>
.page-container {
	display: flex;
	flex-direction: column;
	height: 100vh;
	background-color: #f3f4f6;
}
.loading-state, .empty-state {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
}
.cart-content-wrapper {
	flex: 1;
	display: flex;
	flex-direction: column;
	min-height: 0;
}
.scroll-view-container {
	flex: 1;
	min-height: 0;
}
.card {
	background-color: #fff;
	border-radius: 16rpx;
	box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.04);
}
.cart-item {
	display: flex;
	padding: 20rpx;
	align-items: center;
	margin: 24rpx 24rpx 0;
	.product-image { width: 160rpx; height: 160rpx; border-radius: 8rpx; flex-shrink: 0; }
	.item-info {
		flex: 1;
		margin: 0 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 160rpx;
		.name { font-size: 28rpx; color: #333; }
		.price-stepper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.price { font-size: 30rpx; color: #c7522a; font-weight: 500; }
		}
	}
	.delete-btn { 
		padding: 10rpx; 
		text { color: #999; }
	}
	.invalid-item {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		color: #999;
		font-size: 28rpx;
	}
}
.checkout-bar {
	background-color: #fff;
	border-top: 1rpx solid #f0f0f0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 15rpx 30rpx;
	padding-bottom: calc(15rpx + env(safe-area-inset-bottom));
	.total-price {
		display: flex;
		align-items: baseline;
		.price-symbol { font-size: 24rpx; color: #c7522a; }
		.price-amount { font-size: 36rpx; color: #c7522a; font-weight: bold; }
	}
}
</style>
