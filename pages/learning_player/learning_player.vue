<template>
	<view class="page-container">
		<!-- 加载状态 -->
		<view v-if="isLoading" class="loading-state">
			<u-loading-icon mode="circle" size="30"></u-loading-icon>
		</view>
		<!-- 错误/空状态 -->
		<view v-else-if="!course" class="empty-state">
			<u-empty mode="data" text="课程信息加载失败"></u-empty>
		</view>
		<!-- 页面内容 -->
		<template v-else>
			<scroll-view scroll-y class="scroll-view-container">
				<!-- 播放器区域 -->
				<view class="player-section">
					<view class="video-placeholder">
						<u-icon name="play-right-fill" size="50" color="rgba(255,255,255,0.5)"></u-icon>
						<view class="current-chapter-title">{{ currentChapter.title }}</view>
						<view class="interactive-placeholder">
							「VR/AR互动功能开发中」
						</view>
					</view>
					<view class="chapter-content-text">
						<text>{{ currentChapter.content }}</text>
					</view>
					<u-button type="primary" :customStyle="completeBtnStyle" text="我已学会本章" @click="markAsCompleted"></u-button>
				</view>
	
				<!-- 课程目录 -->
				<view class="outline-section">
					<u-divider text="课程目录"></u-divider>
					<view class="outline-list">
						<view 
							v-for="chapter in course.outline" 
							:key="chapter.id"
							class="outline-item"
							:class="{ 'active': currentChapter.id === chapter.id }"
							@click="switchChapter(chapter)"
						>
							<u-icon v-if="isChapterCompleted(chapter.id)" name="checkmark-circle-fill" color="#008585" size="20"></u-icon>
							<u-icon v-else name="play-circle" color="#999" size="20"></u-icon>
							<text class="title">{{ chapter.title }}</text>
						</view>
					</view>
				</view>
			</scroll-view>

			<!-- 恭喜通关弹窗 -->
			<u-modal 
				:show="showCongratsModal" 
				title="恭喜！" 
				content="您已完成本课程的全部学习，获得结业证书！" 
				@confirm="viewCertificate"
				confirmText="查看证书"
				cancelText="稍后查看"
				showCancelButton
				@cancel="showCongratsModal = false"
			></u-modal>
		</template>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getCourseDetailApi, getCourseProgressApi, updateCourseProgressApi } from '@/api/course.js';

// --- 响应式变量 ---
const course = ref(null);
const isLoading = ref(true);
const courseId = ref(null);
const userInfo = ref(null);
const progress = ref({ completedChapters: [] });
const currentChapter = ref({});
const showCongratsModal = ref(false);

// --- 计算属性 ---
const completeBtnStyle = computed(() => ({
	background: 'linear-gradient(to right, #008585, #74a892)',
	color: '#fff',
	marginTop: '40rpx',
	border: 'none'
}));

// --- 页面逻辑函数 ---
const isChapterCompleted = (chapterId) => {
	return progress.value.completedChapters.includes(chapterId);
};

const switchChapter = (chapter) => {
	currentChapter.value = chapter;
};

const viewCertificate = () => {
	showCongratsModal.value = false;
	uni.navigateTo({
		url: `/pages/certificate/certificate?courseId=${courseId.value}`
	});
};

const markAsCompleted = async () => {
	if (isChapterCompleted(currentChapter.value.id)) {
		return uni.showToast({ title: '本章已学习过', icon: 'none' });
	}
	try {
		const res = await updateCourseProgressApi({
			userId: userInfo.value.id,
			courseId: courseId.value,
			chapterId: currentChapter.value.id
		});
		
		progress.value = res.progress;
		uni.showToast({ title: '学习进度已保存', icon: 'success' });

		if (res.justCompleted) {
			setTimeout(() => {
				showCongratsModal.value = true;
			}, 500);
		}
	} catch (error) {
		console.error("进度保存失败:", error);
	}
};

onLoad(async (options) => {
	courseId.value = parseInt(options.id);
	userInfo.value = uni.getStorageSync('user_info');

	if (!userInfo.value?.id) {
		uni.showModal({
			title: '提示',
			content: '请先登录再开始学习',
			showCancel: false,
			success: () => uni.switchTab({ url: '/pages/profile/profile' })
		});
		return;
	}

	isLoading.value = true;
	try {
		const [courseRes, progressRes] = await Promise.all([
			getCourseDetailApi(courseId.value),
			getCourseProgressApi({ userId: userInfo.value.id, courseId: courseId.value })
		]);

		course.value = courseRes.course;
		progress.value = progressRes.progress || { completedChapters: [] }; 

		if (course.value) {
			uni.setNavigationBarTitle({ title: course.value.title });
			// 找到第一个未完成的章节作为当前章节
			const firstUncompleted = course.value.outline.find(chap => !isChapterCompleted(chap.id));
			currentChapter.value = firstUncompleted || course.value.outline[0];
		}
		
	} catch (error) {
		console.error("加载学习数据失败:", error);
		course.value = null;
	} finally {
		isLoading.value = false;
	}
});
</script>

<style lang="scss" scoped>
.page-container {
	background-color: #f3f4f6;
	min-height: 100vh;
}
.loading-state, .empty-state { 
	padding-top: 40vh;
	display: flex;
	align-items: center;
	justify-content: center;
}
.scroll-view-container {
	height: 100vh;
}

.player-section {
	padding: 30rpx;
	background-color: #004343;
	color: #fff;
	.video-placeholder {
		height: 400rpx;
		background-color: #000;
		border-radius: 16rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.current-chapter-title {
		font-size: 36rpx;
		margin-top: 20rpx;
		text-align: center;
	}
	.interactive-placeholder {
		position: absolute;
		bottom: 20rpx;
		font-size: 24rpx;
		color: rgba(255,255,255,0.4);
	}
	.chapter-content-text {
		font-size: 28rpx;
		color: #e0e0e0;
		margin-top: 30rpx;
		line-height: 1.6;
		min-height: 80rpx;
	}
}

.outline-section {
	background-color: #fff;
	padding-bottom: 24rpx;
	.outline-item {
		display: flex;
		align-items: center;
		padding: 30rpx;
		border-bottom: 1rpx solid #f0f0f0;
		&.active {
			background-color: #f7f3e9;
			.title {
				color: #008585;
				font-weight: bold;
			}
		}
		.title {
			margin-left: 20rpx;
			font-size: 28rpx;
			color: #333;
		}
	}
}
</style>
