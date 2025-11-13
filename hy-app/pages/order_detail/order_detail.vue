<template>
	<view class="page-container">
		<!-- 加载状态 -->
		<view v-if="isLoading" class="loading-state">
			<u-loading-icon mode="circle" size="30"></u-loading-icon>
		</view>
		<!-- 空状态 -->
		<view v-else-if="!order" class="empty-state">
			<u-empty mode="order" text="订单信息不存在"></u-empty>
		</view>
		<!-- 页面内容 -->
		<template v-else>
			<scroll-view scroll-y class="scroll-view-container">
				<!-- 状态头 -->
				<view class="status-header" :style="{ background: getStatusColor(order.status).bg }">
					<view class="status-icon">
						<u-icon :name="getStatusIcon(order.status)" color="#fff" size="34"></u-icon>
					</view>
					<view class="status-text">
						<view class="title">{{ getStatusText(order.status).title }}</view>
						<view class="desc">{{ getStatusText(order.status).desc }}</view>
					</view>
				</view>

				<!-- 地址信息 -->
				<view class="card address-section">
					<u-icon name="map-fill" size="20" color="#999"></u-icon>
					<view class="address-info">
						<view class="user-line">
							<text>{{ order.shippingAddress.name }}</text>
							<text>{{ order.shippingAddress.phone }}</text>
						</view>
						<view class="address-line">
							{{ order.shippingAddress.region }} {{ order.shippingAddress.detail }}
						</view>
					</view>
				</view>

				<!-- 商品列表 -->
				<view class="card product-section">
					<view v-for="item in order.items" :key="item.productId" class="product-item">
						<image class="product-image" :src="getProductImage(item.productId)" mode="aspectFill"></image>
						<view class="item-info">
							<view class="name u-line-2">{{ item.name }}</view>
							<view class="price-quantity">
								<text class="price">¥{{ item.price }}</text>
								<text class="quantity">x {{ item.quantity }}</text>
							</view>
						</view>
					</view>
				</view>

				<!-- 订单信息 -->
				<view class="card info-section">
					<view class="info-row">
						<text class="label">订单编号</text>
						<view class="value-with-icon" @click="copyToClipboard(order.orderId)">
							<text class="value-text">{{ order.orderId }}</text>
							<u-icon name="file-text" size="16" color="#999"></u-icon>
						</view>
					</view>
					<view class="info-row">
						<text class="label">下单时间</text>
						<text class="value-text">{{ formatTimestamp(order.createdAt) }}</text>
					</view>
				</view>

				<!-- 价格信息 -->
				<view class="card price-section">
					<view class="info-row">
						<text class="label">商品总额</text>
						<text class="value-text">¥{{ order.totalPrice.toFixed(2) }}</text>
					</view>
					<view class="info-row">
						<text class="label">运费</text>
						<text class="value-text">¥0.00</text>
					</view>
					<view class="total-row">
						<text class="label">实付款</text>
						<text class="value total">¥{{ order.totalPrice.toFixed(2) }}</text>
					</view>
				</view>

			</scroll-view>
		</template>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import dayjs from 'dayjs';
import { getOrderDetailApi, getProductsApi } from '@/api/market.js';

// --- 响应式变量 ---
const order = ref(null);
const isLoading = ref(true);
const allProducts = ref({});

// --- API 调用函数 ---
const fetchOrderDetail = async (orderId) => {
	isLoading.value = true;
	try {
		const [orderRes, productRes] = await Promise.all([
			getOrderDetailApi(orderId),
			getProductsApi()
		]);
		order.value = orderRes.order;
		if (productRes.products) {
			allProducts.value = productRes.products.reduce((map, product) => {
				map[product.id] = product;
				return map;
			}, {});
		}
	} catch (error) {
		console.error("获取订单详情失败:", error);
		order.value = null;
	} finally {
		isLoading.value = false;
	}
};

// --- 辅助函数与页面逻辑 ---
const getStatusColor = (status) => {
	switch (status) {
		case '待付款': return { bg: 'linear-gradient(to right, #e5c185, #c7522a)' };
		case '已取消': return { bg: '#c0c4cc' };
		default: return { bg: 'linear-gradient(to right, #74a892, #008585)' };
	}
};
const getStatusIcon = (status) => {
	switch (status) {
		case '待付款': return 'more-dot-fill';
		case '已取消': return 'close-circle-fill';
		default: return 'checkmark-circle-fill';
	}
};
const getStatusText = (status) => {
	switch (status) {
		case '待付款': return { title: '等待买家付款', desc: '请在24小时内完成支付' };
		case '已取消': return { title: '交易已取消', desc: '订单已被关闭' };
		default: return { title: '交易成功', desc: '期待您的再次光临' };
	}
};
const getProductImage = (productId) => {
	const product = allProducts.value[productId];
	return product ? product.coverImage : '/static/logo.png';
};
const formatTimestamp = (ts) => dayjs(ts).format('YYYY-MM-DD HH:mm:ss');
const copyToClipboard = (text) => {
	uni.setClipboardData({
		data: text,
		success: () => uni.showToast({ title: '已复制', icon: 'success' })
	});
};

// --- 生命周期函数 ---
onLoad((options) => {
	if (options.orderId) {
		fetchOrderDetail(options.orderId);
	} else {
		isLoading.value = false;
		uni.showToast({ title: '缺少订单ID', icon: 'error' });
	}
});
</script>

<style lang="scss" scoped>
.page-container { background-color: #f3f4f6; height: 100vh; }
.scroll-view-container { height: 100%; }
.loading-state, .empty-state { padding-top: 30vh; }
.card { background-color: #fff; border-radius: 16rpx; margin: 0 24rpx 24rpx; padding: 30rpx; box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.04); }

.status-header {
	display: flex; align-items: center; padding: 40rpx 30rpx; color: #fff;
	.status-icon { margin-right: 20rpx; }
	.status-text {
		.title { font-size: 34rpx; font-weight: bold; }
		.desc { font-size: 24rpx; opacity: 0.8; margin-top: 8rpx; }
	}
}
.address-section {
	display: flex; align-items: flex-start; margin-top: -20rpx; position: relative;
	.u-icon { margin-right: 20rpx; margin-top: 6rpx; }
	.address-info {
		.user-line { font-size: 28rpx; color: #666; text:first-child { margin-right: 20rpx; font-weight: bold; color: #333; } }
		.address-line { font-size: 30rpx; color: #333; margin-top: 10rpx; }
	}
}
.product-section {
	.product-item {
		display: flex; padding: 20rpx 0; border-bottom: 1rpx solid #f5f5f5;
		&:last-child { border-bottom: none; }
		.product-image { width: 140rpx; height: 140rpx; border-radius: 8rpx; flex-shrink: 0; background-color: #f0f0f0; }
		.item-info {
			flex: 1; margin: 0 20rpx;
			.name { font-size: 28rpx; }
			.price-quantity { display: flex; justify-content: space-between; align-items: baseline; margin-top: 10rpx;
				.price { font-size: 28rpx; font-weight: 500; }
				.quantity { font-size: 24rpx; color: #999; }
			}
		}
	}
}
.info-section, .price-section {
	.info-row { 
		display: flex; justify-content: space-between; align-items: center; 
		font-size: 28rpx; padding: 12rpx 0;
		.label { color: #666; }
		.value-text { font-weight: 500; }
		.value-with-icon {
			display: flex;
			align-items: center;
			font-weight: 500;
			.value-text { margin-right: 8rpx; }
		}
	}
	.total-row {
		text-align: right; margin-top: 20rpx; padding-top: 20rpx; border-top: 1rpx solid #f5f5f5;
		.label { font-size: 28rpx; }
		.total { font-size: 36rpx; font-weight: bold; color: #c7522a; }
	}
}
</style>
