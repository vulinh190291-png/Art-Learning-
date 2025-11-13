<template>
	<view class="page-container">
		<!-- 搜索区 -->
		<view class="search-section">
			<u-search 
				placeholder="探索中华艺术瑰宝" 
				v-model="keyword" 
				:showAction="false" 
				bgColor="#ffffff" 
				height="80rpx"
				searchIconColor="#004343" 
				placeholderColor="#909399" 
				shape="round"
				@clear="onSearchClear"
			></u-search>
		</view>

		<!-- 每日一赏 -->
		<view v-if="featuredItem" class="featured-card card" @click="goToFeaturedDetail">
			<image class="featured-image" :src="formatFeaturedImagePath(featuredItem)" mode="aspectFill"></image>
			<view class="featured-overlay">
				<view class="featured-tag">每日一赏</view>
				<view class="featured-title u-line-1">{{ featuredItem.title }}</view>
				<view class="featured-desc u-line-2">{{ featuredItem.description }}</view>
			</view>
		</view>

		<!-- 内容区 -->
		<view class="content-section">
			<view v-if="isLoading" class="loading-state">
				<u-loading-icon mode="circle" size="30" text="正在加载艺术瑰宝..." textSize="16"></u-loading-icon>
			</view>
			<view v-else-if="loadError" class="error-state">
				<u-empty mode="data" icon="/static/logo.png" text="数据加载失败"></u-empty>
				<u-button type="primary" :customStyle="retryBtnStyle" text="重新加载" @click="fetchAllData"></u-button>
			</view>
			<view v-else class="collapse-wrapper">
				<u-collapse :border="false">
					<view v-for="art in artData" :key="art.id" class="collapse-card-item">
						<u-collapse-item>
							<template #title>
								<view class="collapse-title">
									<image class="title-icon" :src="art.icon" mode="aspectFit"></image>
									<text class="title-text">{{ art.category }}</text>
								</view>
							</template>
							<view class="collapse-content">
								<view 
									class="sub-category-item" 
									v-for="(sub, index) in art.sub_categories" 
									:key="index" 
									@click="onSubCategoryClick(sub)"
								>
									{{ sub.name }}
								</view>
							</view>
						</u-collapse-item>
					</view>
				</u-collapse>
			</view>
		</view>

		<!-- 详情弹窗 -->
		<u-popup :show="showDetailPopup" @close="onPopupClose" mode="bottom" round="20">
			<view class="detail-popup-container">
				<u-icon name="close" class="close-btn" size="20" @click="onPopupClose"></u-icon>
				<scroll-view scroll-y class="popup-scroll-view">
					<template v-if="selectedSubCategory">
						<u-swiper
							:list="selectedSubCategory.representative_works"
							height="400rpx"
							imgMode="aspectFit"
							circular
							indicator
							indicatorMode="dot"
						></u-swiper>
						
						<view class="popup-title">{{ selectedSubCategory.name }}</view>
						<view class="detail-section">
							<view class="section-title"><text>艺术简介</text></view>
							<u--text :text="selectedSubCategory.introduction" color="#333" lineHeight="24"></u--text>
						</view>
						<view class="detail-section">
							<view class="section-title"><text>历史起源</text></view>
							<u--text :text="selectedSubCategory.history" color="#333" lineHeight="24"></u--text>
						</view>
						<view class="detail-section">
							<view class="section-title"><text>艺术特点</text></view>
							<u--text :text="selectedSubCategory.features" color="#333" lineHeight="24"></u--text>
						</view>
						<view class="detail-section">
							<view class="section-title"><text>文化意义</text></view>
							<u--text :text="selectedSubCategory.cultural_meaning" color="#333" lineHeight="24"></u--text>
						</view>
					</template>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { getArtStylesApi, getFeaturedApi } from '@/api/common.js';

// --- 响应式变量 ---
const keyword = ref('');
const artData = ref([]);
const showDetailPopup = ref(false);
const selectedSubCategory = ref(null);
const isLoading = ref(true);
const loadError = ref(false);
const featuredItem = ref(null);

// --- 计算属性 ---
const retryBtnStyle = computed(() => ({
	width: '200rpx', height: '70rpx', marginTop: '20rpx',
	background: 'linear-gradient(to right, #008585, #004343)',
	color: '#fff', border: 'none'
}));

const fetchArtStyles = async () => {
	try {
		const res = await getArtStylesApi();
		artData.value = res.art_styles || [];
		loadError.value = false; // 成功加载后，重置错误状态
	} catch (error) {
		loadError.value = true;
		console.error("获取艺术风格失败:", error);
	}
};

const fetchFeaturedContent = async () => {
	try {
		const res = await getFeaturedApi();
		featuredItem.value = res.item;
	} catch (error) {
		console.error("获取推荐内容失败:", error);
	}
};

// 封装一个统一的数据获取入口
const fetchAllData = async () => {
	isLoading.value = true;
	// 并行获取数据
	await Promise.all([
		fetchArtStyles(),
		fetchFeaturedContent()
	]);
	isLoading.value = false;
};

watch(keyword, (newValue) => {
	if (newValue.trim()) {
		for (const category of artData.value) {
			if(category.sub_categories && Array.isArray(category.sub_categories)) {
				const foundSubCategory = category.sub_categories.find(sub => sub.name === newValue.trim());
				if (foundSubCategory) {
					onSubCategoryClick(foundSubCategory);
					break; 
				}
			}
		}
	}
});

const formatFeaturedImagePath = (item) => {
	if (!item) return '';
	let imagePath = item.coverImage || item.imageUrl || '';
	if (!imagePath) return '/static/logo.png';
	if (imagePath.endsWith('.png') || imagePath.endsWith('.jpg') || imagePath.endsWith('.jpeg')) {
		return imagePath;
	}
	if (item.type === 'course') return `${imagePath}.png`;
	if (item.type === 'product') return `${imagePath}.jpg`;
	return imagePath;
};

const goToFeaturedDetail = () => {
	if (!featuredItem.value) return;
	const item = featuredItem.value;
	switch (item.type) {
		case 'course':
			uni.navigateTo({ url: `/pages/course_detail/course_detail?id=${item.id}` });
			break;
		case 'product':
			uni.navigateTo({ url: `/pages/product_detail/product_detail?id=${item.id}` });
			break;
		case 'post':
			uni.switchTab({ url: '/pages/gallery/gallery' });
			break;
	}
};

const onSubCategoryClick = (subItem) => {
	selectedSubCategory.value = subItem;
	showDetailPopup.value = true;
};

const onPopupClose = () => {
	showDetailPopup.value = false;
	keyword.value = ''; 
};

const onSearchClear = () => {
	showDetailPopup.value = false;
};

// --- 生命周期函数 ---
onMounted(() => {
	fetchAllData();
});
</script>

<style lang="scss" scoped>
$color-primary-dark: #004343;
$color-primary: #008585;
$color-secondary: #74a892;
$color-background-gradient-start: #f7f3e9;
$color-background-gradient-end: #f0e9d6;

.page-container {
	min-height: 100vh;
	background: linear-gradient(180deg, $color-background-gradient-start, $color-background-gradient-end);
}

.search-section {
	padding: 20rpx 30rpx;
	background-color: #f7f6f2;
	position: sticky;
	top: 0;
	z-index: 10;
}

.card {
	background-color: #fff;
	border-radius: 20rpx;
	margin: 24rpx;
	box-shadow: 0 10rpx 40rpx rgba(0,0,0,0.06);
}

.featured-card {
	height: 800rpx;
	position: relative;
	margin-top: 0;
	overflow: hidden;

	.featured-image {
		width: 100%;
		height: 100%;
	}
	.featured-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(to top, rgba(0,0,0,0.6), transparent 60%);
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		color: #fff;
	}
	.featured-tag {
		background-color: #c7522a;
		font-size: 22rpx;
		padding: 6rpx 16rpx;
		border-radius: 20rpx;
		align-self: flex-start;
	}
	.featured-title {
		font-size: 38rpx;
		font-weight: bold;
		margin-top: 16rpx;
		text-shadow: 0 2rpx 4rpx rgba(0,0,0,0.3);
	}
	.featured-desc {
		font-size: 26rpx;
		margin-top: 10rpx;
		opacity: 0.9;
		text-shadow: 0 2rpx 4rpx rgba(0,0,0,0.3);
	}
}

.content-section {
	padding: 0 0 24rpx;
	
	.loading-state, .error-state {
		padding-top: 100rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
}

.collapse-wrapper {
	padding: 0 30rpx;
}

.collapse-card-item {
	background-color: #fff;
	border-radius: 20rpx;
	margin-bottom: 24rpx;
	box-shadow: 0 10rpx 40rpx rgba(0,0,0,0.06);
	
	::v-deep .u-cell__body {
		padding: 36rpx 30rpx !important;
	}
	::v-deep .u-cell__right-icon-wrap {
		color: #909399 !important;
	}
}

.collapse-title {
	display: flex; 
	align-items: center;
	width: 100%;

	.title-icon { 
		width: 26px; 
		height: 26px; 
		margin-right: 24rpx;
		flex-shrink: 0;
	}
	.title-text { 
		color: $color-primary-dark; 
		font-size: 34rpx; 
		font-weight: 600; 
	}
}

::v-deep .u-collapse-item__content {
	background-color: #fdfaf2;
	padding: 0;
}

.collapse-content {
	padding: 20rpx 30rpx; 
	display: flex; 
	flex-wrap: wrap; 
	gap: 20rpx;
	.sub-category-item {
		background-color: #f7f6f2;
		color: #5c5c5c;
		font-size: 14px;
		padding: 12rpx 28rpx;
		border-radius: 30rpx;
		transition: all 0.2s ease;
		&:active {
			background-color: $color-secondary;
			color: #fff;
			transform: scale(0.95);
		}
	}
}

.detail-popup-container {
	height: 85vh; 
	padding: 30rpx; 
	position: relative; 
	background-color: #fcfaf2;
	.close-btn { 
		position: absolute; 
		top: 30rpx; 
		right: 30rpx; 
		z-index: 10;
	}
	.popup-scroll-view { 
		height: 100%; 
	}
	.popup-title { 
		font-size: 44rpx; 
		font-weight: bold; 
		color: $color-primary-dark; 
		margin: 30rpx 0; 
	}
	.detail-section {
		margin-bottom: 40rpx;
		.section-title { 
			font-size: 32rpx; 
			font-weight: 600; 
			color: $color-primary; 
			padding-left: 20rpx; 
			border-left: 8rpx solid $color-primary; 
			margin-bottom: 20rpx; 
		}
	}
}
</style>
