<template>
	<view class="page-container">
		<view class="tabs-container">
			<u-tabs :list="tabList" @click="onTabClick" :current="currentTab" :activeStyle="{ color: '#008585', fontWeight: 'bold' }"></u-tabs>
		</view>

		<view class="content-section">
			<!-- 加载状态 -->
			<view v-if="isLoading" class="loading-state">
				<u-loading-icon mode="circle" size="30"></u-loading-icon>
			</view>
			<!-- 空状态 -->
			<view v-else-if="filteredCourses.length === 0" class="empty-state">
				<u-empty mode="list" text="该分类下暂无课程"></u-empty>
			</view>
			
			<!-- 课程列表 -->
			<view v-else class="course-list">
				<view v-for="course in filteredCourses" :key="course.id" class="course-card" @click="goToCourseDetail(course)">
					<image class="cover-image" :src="course.coverImage" mode="aspectFit"></image>
					
					<view class="info-wrapper">
						<view class="title u-line-2">{{ course.title }}</view>
						<view class="instructor">
							<u-icon name="account" size="16" color="#999"></u-icon>
							<text>{{ course.instructor }}</text>
						</view>
						<view class="footer">
							<view class="student-count">
								<u-icon name="level" size="16" color="#999"></u-icon>
								<text>{{ course.studentCount }} 人在学</text>
							</view>
							<view class="price" :class="{ 'free': course.type === 'free' }">
								{{ course.type === 'free' ? '免费' : `¥ ${course.price}` }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getCoursesApi } from '@/api/course.js';

// --- 响应式变量和计算属性 ---
const courses = ref([]);
const isLoading = ref(true);
const tabList = ref([{ name: '全部' }, { name: '免费课程' }, { name: '付费课程' }]);
const currentTab = ref(0);

const filteredCourses = computed(() => {
	switch(currentTab.value) {
		case 1:
			return courses.value.filter(c => c.type === 'free');
		case 2:
			return courses.value.filter(c => c.type === 'paid');
		case 0:
		default:
			return courses.value;
	}
});

// --- 事件处理函数 ---
const onTabClick = (item) => {
	currentTab.value = item.index;
};

const goToCourseDetail = (course) => {
	uni.navigateTo({
		url: `/pages/course_detail/course_detail?id=${course.id}`
	});
};

const fetchCourses = async () => {
	isLoading.value = true;
	try {
		const res = await getCoursesApi();
		// 直接使用返回的业务数据进行赋值
		courses.value = res.courses || [];
	} catch (error) {
		// 错误提示由拦截器处理，这里仅作降级和调试
		courses.value = [];
		console.error("获取课程列表失败:", error);
	} finally {
		isLoading.value = false;
	}
};

// --- 生命周期函数 ---
onMounted(() => {
	fetchCourses();
});
</script>

<style lang="scss" scoped>
.page-container {
	background-color: #f3f4f6;
	min-height: 100vh;
}
.tabs-container {
	background-color: #fff;
}
.content-section {
	padding: 24rpx;
	.loading-state, .empty-state {
		padding-top: 30vh;
	}
}
.course-card {
	display: flex;
	background-color: #fff;
	border-radius: 16rpx;
	margin-bottom: 24rpx;
	box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.05);
	overflow: hidden;

	.cover-image {
		width: 200rpx;
		height: 200rpx;
		flex-shrink: 0;
		background-color: #f0f0f0;
	}

	.info-wrapper {
		flex: 1;
		padding: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.title {
			font-size: 30rpx;
			font-weight: 500;
			color: #333;
		}
		
		.instructor {
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: #999;
			margin: 10rpx 0;
			text {
				margin-left: 8rpx;
			}
		}

		.footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 10rpx;

			.student-count {
				font-size: 24rpx;
				color: #999;
				display: flex;
				align-items: center;
				text {
					margin-left: 8rpx;
				}
			}

			.price {
				font-size: 32rpx;
				font-weight: bold;
				color: #c7522a;
				&.free {
					color: #008585;
				}
			}
		}
	}
}
</style>
