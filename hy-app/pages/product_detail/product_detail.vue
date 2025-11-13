<template>
	<view class="page-container">
		<!-- 加载状态 -->
		<view v-if="isLoading" class="loading-state">
			<u-loading-icon mode="circle" size="30"></u-loading-icon>
		</view>
		<!-- 空状态 -->
		<view v-else-if="!product" class="empty-state">
			<u-empty mode="data" text="商品信息加载失败"></u-empty>
		</view>
		<!-- 页面内容 -->
		<template v-else>
			<!-- 商品轮播图 -->
			<u-swiper :list="swiperList" height="750rpx" indicator indicatorMode="dot" circular></u-swiper>
			
			<!-- 价格与名称 -->
			<view class="info-section card">
				<view class="price-line">
					<text class="symbol">¥</text>
					<text class="price">{{ product.price }}</text>
				</view>
				<view class="name">{{ product.name }}</view>
			</view>

			<!-- 店铺信息 -->
			<view class="seller-section card" @click="visitStore">
				<view class="left">
					<image class="avatar" :src="product.sellerAvatar"></image>
					<text class="nickname">{{ product.sellerName }}</text>
				</view>
				<view class="right">
					<u-button size="small" shape="circle" text="进店逛逛" @click.stop="visitStore"></u-button>
				</view>
			</view>

			<!-- 商品详情 -->
			<view class="detail-section card">
				<u-divider text="宝贝详情"></u-divider>
				<view class="description">
					<text>{{ product.description }}</text>
				</view>
			</view>

			<!-- 底部操作栏 -->
			<view class="action-bar">
				<view class="left-buttons">
					<u-icon name="server-fill" label="客服" size="24" labelPos="bottom" space="4px"></u-icon>
					<u-icon name="shopping-cart" label="购物车" size="24" labelPos="bottom" space="4px" @click="goToCart"></u-icon>
				</view>
				<view class="right-buttons">
					<u-button shape="circle" :customStyle="cartBtnStyle" text="加入购物车" @click="addToCart"></u-button>
					<u-button shape="circle" :customStyle="buyBtnStyle" text="立即购买" @click="buyNow"></u-button>
				</view>
			</view>

			<!-- 购买弹窗 -->
			<u-popup :show="showBuyPopup" @close="showBuyPopup = false" round="10">
				<view class="popup-content">
					<view class="popup-header">
						<image class="popup-product-image" :src="product.coverImage" mode="aspectFill"></image>
						<view class="popup-product-info">
							<view class="popup-price">
								<text class="symbol">¥</text>
								<text class="price">{{ product.price }}</text>
							</view>
							<view class="popup-stock">库存：{{ product.stock }}件</view>
						</view>
					</view>
					<view class="popup-body">
						<view class="quantity-title">购买数量</view>
						<u-number-box v-model="popupQuantity" :min="1" :max="product.stock"></u-number-box>
					</view>
					<view class="popup-footer">
						<u-button type="primary" :customStyle="buyBtnStyle" text="确定" @click="confirmBuy"></u-button>
					</view>
				</view>
			</u-popup>
		</template>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getProductDetailApi, addToCartApi } from '@/api/market.js';

// --- 响应式变量 ---
const product = ref(null);
const isLoading = ref(true);
const productId = ref(null);
const showBuyPopup = ref(false);
const popupQuantity = ref(1);

// --- 计算属性 ---
const swiperList = computed(() => {
	return product.value ? [product.value.coverImage] : [];
});

const cartBtnStyle = computed(() => ({
	backgroundColor: '#e5c185', color: '#004343', border: 'none', width: '220rpx'
}));

const buyBtnStyle = computed(() => ({
	backgroundColor: '#c7522a', color: '#fff', border: 'none'
}));

const fetchProductDetail = async () => {
	if (!productId.value) return;
	isLoading.value = true;
	try {
		const res = await getProductDetailApi(productId.value);
		product.value = res.product;
	} catch (error) {
		console.error("获取商品详情失败:", error);
		product.value = null; // 加载失败时清空数据
	} finally {
		isLoading.value = false;
	}
};

// 【核心改动3】重构 addToCart 函数
const addToCart = async () => {
	const user = uni.getStorageSync('user_info');
	if (!user) {
		return uni.showModal({
			title: '提示', content: '请先登录', showCancel: false,
			success: () => uni.switchTab({ url: '/pages/profile/profile' })
		});
	}
	
	try {
		await addToCartApi({
			userId: user.id,
			productId: productId.value,
			quantity: 1 // 详情页默认添加1件
		});
		// 成功提示由拦截器自动处理
	} catch (error) {
		console.error("添加购物车失败:", error);
		// 失败提示也由拦截器处理
	}
};

const buyNow = () => {
	const user = uni.getStorageSync('user_info');
	if (!user) {
		return uni.showModal({
			title: '提示', content: '请先登录', showCancel: false,
			success: () => uni.switchTab({ url: '/pages/profile/profile' })
		});
	}
	showBuyPopup.value = true;
};

const confirmBuy = () => {
	const orderItems = [{
		productId: product.value.id,
		quantity: popupQuantity.value,
		productDetails: product.value
	}];
	uni.setStorageSync('order_confirm_items', orderItems);
	showBuyPopup.value = false;
	uni.navigateTo({ url: '/pages/order_confirm/order_confirm' });
};

const visitStore = () => {
	if (!product.value?.sellerId) return;
	uni.setStorageSync('store_filter', {
		sellerId: product.value.sellerId,
		sellerName: product.value.sellerName
	});
	uni.switchTab({ url: '/pages/market/market' });
};

const goToCart = () => {
	uni.navigateTo({ url: '/pages/cart/cart' });
};

// --- 生命周期函数 ---
onLoad((options) => {
	productId.value = options.id;
	fetchProductDetail();
});
</script>

<style lang="scss" scoped>
.page-container {
	background-color: #f3f4f6;
	padding-bottom: 140rpx; 
}
.card {
	background-color: #fff;
	border-radius: 16rpx;
	margin: 0 24rpx 24rpx;
	padding: 30rpx;
	box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.04);
}
.loading-state, .empty-state {
	padding-top: 30vh;
	display: flex;
	align-items: center;
	justify-content: center;
}
.info-section {
	.price-line {
		color: #c7522a;
		margin-bottom: 16rpx;
		.symbol { font-size: 32rpx; }
		.price { font-size: 48rpx; font-weight: bold; }
	}
	.name {
		font-size: 34rpx;
		font-weight: 500;
		color: #333;
	}
}
.seller-section {
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.left {
		display: flex;
		align-items: center;
		.avatar {
			width: 64rpx;
			height: 64rpx;
			border-radius: 50%;
			margin-right: 20rpx;
		}
		.nickname {
			font-size: 28rpx;
			color: #333;
		}
	}
}
.detail-section {
	.description {
		margin-top: 20rpx;
		font-size: 28rpx;
		color: #555;
		line-height: 1.7;
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
	justify-content: space-between;
	padding: 15rpx 20rpx;
	padding-bottom: calc(15rpx + env(safe-area-inset-bottom));
	z-index: 10;
	.left-buttons {
		display: flex;
		gap: 40rpx;
		padding: 0 20rpx;
	}
	.right-buttons {
		display: flex;
		align-items: center;
		gap: 20rpx;
	}
}
.popup-content {
	padding: 30rpx;
	.popup-header {
		display: flex;
		align-items: flex-end;
		padding-bottom: 30rpx;
		border-bottom: 1rpx solid #f5f5f5;
		.popup-product-image {
			width: 160rpx;
			height: 160rpx;
			border-radius: 8rpx;
			margin-right: 20rpx;
		}
		.popup-product-info {
			.popup-price {
				color: #c7522a;
				.symbol { font-size: 26rpx; }
				.price { font-size: 40rpx; font-weight: bold; }
			}
			.popup-stock {
				font-size: 24rpx;
				color: #999;
				margin-top: 10rpx;
			}
		}
	}
	.popup-body {
		padding: 30rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.quantity-title {
			font-size: 28rpx;
			color: #333;
		}
	}
	.popup-footer {
		padding-top: 20rpx;
	}
}
</style>
