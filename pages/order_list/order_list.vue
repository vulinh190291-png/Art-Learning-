<template>
	<view class="page-container">
		<!-- 加载状态 -->
		<view v-if="isLoading" class="loading-state">
			<u-loading-icon mode="circle" size="30"></u-loading-icon>
		</view>

		<!-- 空状态 -->
		<view v-if="!isLoading && orderList.length === 0" class="empty-state">
			<u-empty mode="order" text="您还没有任何订单"></u-empty>
		</view>
		
		<!-- 订单列表 -->
		<scroll-view v-show="!isLoading && orderList.length > 0" scroll-y class="scroll-view-container">
			<view v-for="(order, index) in orderList" :key="order.orderId" class="order-card card">
				<view class="card-header" @click="viewOrderDetail(order)">
					<text class="order-id">订单号: {{ order.orderId }}</text>
					<text class="status" :style="{ color: getStatusColor(order.status) }">{{ order.status }}</text>
				</view>
				<scroll-view class="card-body" scroll-x @click="viewOrderDetail(order)">
					<view class="product-list">
						<view v-for="item in order.items" :key="item.productId" class="product-item">
							<image class="product-image" :src="getProductImage(item.productId)" mode="aspectFill"></image>
						</view>
					</view>
				</scroll-view>
				<view class="card-footer">
					<view class="total-price">
						<text>合计 ¥</text>
						<text class="price-amount">{{ order.totalPrice.toFixed(2) }}</text>
					</view>
					<view class="action-buttons">
						<u-button
							v-if="order.status === '已完成' || order.status === '已取消'"
							shape="circle" size="small" text="删除记录"
							:customStyle="actionBtnPlainStyle"
							@click="deleteOrderRecord(order, index)"
						></u-button>
						<u-button
							v-if="order.status === '待付款'"
							shape="circle" size="small" text="取消订单"
							:customStyle="actionBtnPlainStyle"
							@click="cancelOrder(order)"
						></u-button>
						<u-button
							shape="circle" size="small" text="查看详情"
							:customStyle="actionBtnStyle"
							@click="viewOrderDetail(order)"
						></u-button>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { getOrdersApi, getProductsApi, updateOrderStatusApi, deleteOrderApi } from '@/api/market.js';

// --- 响应式变量 ---
const orderList = ref([]);
const allProducts = ref({});
const isLoading = ref(true);
const userInfo = ref(null);
const isProcessing = ref(false); // 防止重复点击的锁

// --- 样式变量 ---
const actionBtnStyle = { backgroundColor: '#008585', color: '#fff', margin: '0 0 0 16rpx', border: 'none' };
const actionBtnPlainStyle = { margin: '0 0 0 16rpx' };


const fetchOrders = async () => {
	isLoading.value = true;
	try {
		// 并行获取订单列表和所有商品信息
		const [orderRes, productRes] = await Promise.all([
			getOrdersApi({ userId: userInfo.value.id }),
			getProductsApi()
		]);

		orderList.value = orderRes.orders || [];
		
		if (productRes.products) {
			allProducts.value = productRes.products.reduce((map, product) => {
				map[product.id] = product;
				return map;
			}, {});
		}
	} catch (error) {
		console.error("获取订单列表失败:", error);
		// 错误提示由拦截器处理
	} finally {
		isLoading.value = false;
	}
};

const cancelOrder = (order) => {
	if (isProcessing.value) return;
	
	uni.showModal({
		title: '提示',
		content: '确定要取消这个订单吗？',
		success: async (res) => {
			if (res.confirm) {
				isProcessing.value = true;
				try {
					// 乐观更新UI
					order.status = '已取消';
					await updateOrderStatusApi(order.orderId, { status: '已取消' });
					// 成功提示由拦截器处理
				} catch (error) {
					// 如果失败，可以考虑刷新列表以回滚状态
					fetchOrders();
					console.error("取消订单失败:", error);
				} finally {
					isProcessing.value = false;
				}
			}
		}
	});
};

const deleteOrderRecord = (order, index) => {
	if (isProcessing.value) return;
	
	uni.showModal({
		title: '提示',
		content: '确定要删除这条订单记录吗？此操作无法恢复。',
		success: async (res) => {
			if (res.confirm) {
				isProcessing.value = true;
				try {
					// 乐观更新UI
					orderList.value.splice(index, 1);
					await deleteOrderApi(order.orderId);
					// 成功提示由拦截器处理
				} catch (error) {
					// 如果失败，刷新列表以回滚状态
					fetchOrders();
					console.error("删除订单失败:", error);
				} finally {
					isProcessing.value = false;
				}
			}
		}
	});
};


// --- 辅助函数与页面逻辑 ---
const getProductImage = (productId) => {
	const product = allProducts.value[productId];
	return product ? product.coverImage : '/static/logo.png';
};

const getStatusColor = (status) => {
	switch (status) {
		case '待付款': return '#c7522a';
		case '已完成': return '#008585';
		case '已取消': return '#999999';
		default: return '#333333';
	}
};

const viewOrderDetail = (order) => {
	uni.navigateTo({
		url: `/pages/order_detail/order_detail?orderId=${order.orderId}`
	});
};

// --- 生命周期函数 ---
onShow(() => {
	userInfo.value = uni.getStorageSync('user_info');
	if (userInfo.value) {
		fetchOrders();
	} else {
		isLoading.value = false;
		orderList.value = [];
		uni.showModal({
			title: '提示',
			content: '请先登录',
			showCancel: false,
			success: () => uni.switchTab({ url: '/pages/profile/profile' })
		});
	}
});
</script>

<style lang="scss" scoped>
.page-container { background-color: #f3f4f6; min-height: 100vh; }
.loading-state { position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; justify-content: center; align-items: center; background-color: rgba(255, 255, 255, 0.8); z-index: 99; }
.empty-state { padding-top: 30vh; }
.scroll-view-container { height: 100vh; }
.card { background-color: #fff; border-radius: 16rpx; margin: 24rpx; box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.04); }
.order-card { 
	padding: 0; 
	.card-header { 
		display: flex; justify-content: space-between; align-items: center; 
		padding: 20rpx 30rpx; border-bottom: 1rpx solid #f5f5f5; 
		.order-id { font-size: 24rpx; color: #999; } 
		.status { font-size: 28rpx; font-weight: 500; } 
	} 
	.card-body { 
		padding: 20rpx 0 20rpx 30rpx; 
		.product-list { display: flex; flex-direction: row; white-space: nowrap; } 
		.product-item { display: inline-flex; margin-right: 20rpx; } 
		.product-image { width: 140rpx; height: 140rpx; border-radius: 8rpx; flex-shrink: 0; background-color: #f0f0f0; } 
	} 
	.card-footer { 
		display: flex; justify-content: space-between; align-items: center; 
		padding: 20rpx 30rpx; 
		.total-price { 
			font-size: 26rpx; color: #666; 
			.price-amount { font-size: 34rpx; font-weight: bold; color: #333; } 
		} 
		.action-buttons { display: flex; align-items: center; } 
	} 
}
</style>
