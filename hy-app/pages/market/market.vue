<template>
	<view class="page-container">
		<!-- 搜索栏 -->
		<view class="search-bar">
			<u-search 
				placeholder="搜索感兴趣的宝贝" 
				v-model="keyword"
				:showAction="false"
				bgColor="#ffffff"
				shape="round"
				height="70rpx"
			></u-search>
		</view>

		<!-- 店铺筛选提示条 -->
		<view v-if="filter.sellerName" class="filter-bar">
			<text class="filter-text">正在浏览【{{ filter.sellerName }}】的店铺</text>
			<text class="clear-filter" @click="clearFilter">查看全部</text>
		</view>

		<!-- 内容区 -->
		<view class="content-section">
			<!-- 加载状态 -->
			<view v-if="isLoading" class="loading-state">
				<u-loading-icon mode="circle" size="30"></u-loading-icon>
			</view>
			<!-- 列表为空 -->
			<view v-else-if="products.length === 0" class="empty-state">
				<u-empty mode="car" text="集市里还没有商品"></u-empty>
			</view>
			<!-- 筛选后无结果 -->
			<view v-else-if="filteredProducts.length === 0" class="empty-state">
				<u-empty mode="search" :text="filter.sellerId ? '该店铺暂无商品' : '没有找到相关的宝贝'"></u-empty>
			</view>
			
			<!-- 商品网格 -->
			<view v-else class="grid-container">
				<view v-for="item in filteredProducts" :key="item.id" class="product-card" @click="goToProductDetail(item)">
					<view class="image-wrapper">
						<image class="product-image" :src="item.coverImage" mode="aspectFill"></image>
						<view v-if="item.isCertified" class="certified-tag">
							<u-icon name="level" color="#fff" size="12"></u-icon>
							<text>绘影认证</text>
						</view>
					</view>
					<view class="card-content">
						<view class="name u-line-2">{{ item.name }}</view>
						<view class="price-section">
							<text class="symbol">¥</text>
							<text class="price">{{ item.price }}</text>
						</view>
						<view class="seller-info">
							<image class="avatar" :src="item.sellerAvatar"></image>
							<text class="nickname">{{ item.sellerName }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { onPullDownRefresh, onShow } from '@dcloudio/uni-app';
// 【核心改动1】从 api/market.js 引入获取商品列表的函数
import { getProductsApi } from '@/api/market.js';

// --- 响应式变量 ---
const products = ref([]);
const isLoading = ref(true);
const keyword = ref('');
const filter = reactive({ sellerId: null, sellerName: '' });

// --- 计算属性 ---
const filteredProducts = computed(() => {
	let result = products.value;

	// 店铺筛选
	if (filter.sellerId) {
		result = result.filter(p => p.sellerId === filter.sellerId);
	}

	// 关键词搜索
	if (keyword.value) {
		const searchKeyword = keyword.value.trim().toLowerCase();
		result = result.filter(item => 
			item.name.toLowerCase().includes(searchKeyword)
		);
	}

	return result;
});

// --- API 调用函数 ---

// 【核心改动2】重构 fetchProducts 函数
const fetchProducts = async () => {
	isLoading.value = true;
	try {
		const res = await getProductsApi();
		// 直接使用返回的业务数据进行赋值
		products.value = res.products || [];
	} catch (error) {
		// 错误提示由拦截器处理，这里仅作降级和调试
		products.value = [];
		console.error("获取商品列表失败:", error);
	} finally {
		isLoading.value = false;
		uni.stopPullDownRefresh();
	}
};

// --- 页面逻辑与事件处理 ---
const clearFilter = () => {
	filter.sellerId = null;
	filter.sellerName = '';
	keyword.value = '';
};

const goToProductDetail = (product) => {
	uni.navigateTo({ url: `/pages/product_detail/product_detail?id=${product.id}` });
};

// --- 生命周期函数 ---
onShow(() => {
	// 检查是否有从详情页传来的店铺筛选信息
	const storeFilter = uni.getStorageSync('store_filter');
	if (storeFilter && storeFilter.sellerId) {
		filter.sellerId = storeFilter.sellerId;
		filter.sellerName = storeFilter.sellerName;
		uni.removeStorageSync('store_filter');
	}
	
	// 每次进入页面都获取最新数据
	fetchProducts();
});

onPullDownRefresh(() => {
	clearFilter();
	fetchProducts();
});
</script>

<style lang="scss" scoped>
.page-container { background-color: #f3f4f6; min-height: 100vh; }
.search-bar { padding: 20rpx; background-color: #fff; position: sticky; top: 0; z-index: 99; }
.filter-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16rpx 30rpx;
	background-color: #fbf2c4;
	font-size: 26rpx;
	color: #c7522a;
	.filter-text {
		font-weight: 500;
	}
	.clear-filter {
		text-decoration: underline;
	}
}
.content-section { padding: 10rpx; }
.loading-state, .empty-state { padding-top: 30vh; }
.grid-container { column-count: 2; column-gap: 20rpx; padding: 0 10rpx; }
.product-card { 
	background-color: #fff; border-radius: 16rpx; 
	margin-bottom: 20rpx; box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.05); 
	break-inside: avoid; overflow: hidden; 
	transition: all 0.2s ease-in-out; 
	&:active { transform: scale(0.98); } 
	.image-wrapper { 
		position: relative; 
		.product-image { width: 100%; aspect-ratio: 1 / 1; background-color: #f0f0f0; } 
		.certified-tag { 
			position: absolute; top: 20rpx; left: 20rpx; 
			background: linear-gradient(to right, #008585, #74a892); 
			color: #fff; font-size: 20rpx; padding: 4rpx 12rpx; 
			border-radius: 20rpx; display: flex; align-items: center; 
			text { margin-left: 4rpx; } 
		} 
	} 
	.card-content { 
		padding: 20rpx; 
		.name { font-size: 28rpx; color: #333; height: 80rpx; } 
		.price-section { 
			margin-top: 10rpx; color: #c7522a; 
			.symbol { font-size: 24rpx; } 
			.price { font-size: 36rpx; font-weight: bold; } 
		} 
		.seller-info { 
			display: flex; align-items: center; margin-top: 16rpx; 
			.avatar { width: 40rpx; height: 40rpx; border-radius: 50%; margin-right: 10rpx; } 
			.nickname { font-size: 24rpx; color: #999; } 
		} 
	} 
}
</style>
