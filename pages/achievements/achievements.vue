<template>
	<view class="page-container">
		<view v-if="isLoading" class="loading-state">
			<u-loading-icon mode="circle" size="30"></u-loading-icon>
		</view>
		
		<view v-else-if="achievementList.length === 0" class="empty-state">
			<u-empty
				mode="history"
				icon="/static/logo.png"
				text="您还没有获得任何成就，快去探索吧！"
			>
			</u-empty>
		</view>

		<view v-else class="achievements-grid">
			<view 
				v-for="badge in achievementList" 
				:key="badge.badgeId" 
				class="badge-card"
				:class="{ 'earned': badge.isEarned }"
			>
				<image class="badge-icon" :src="badge.icon"></image>
				<view class="badge-name">{{ badge.name }}</view>
				<view class="badge-desc">{{ badge.description }}</view>
				<view v-if="!badge.isEarned" class="lock-overlay">
					<u-icon name="lock-fill" color="#fff" size="30"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';

const achievementList = ref([]);
const isLoading = ref(true);
const userInfo = ref(null);

const fetchAchievements = async () => {
	isLoading.value = true;
	try {
		const res = await uni.request({ url: `http://localhost:3000/api/achievements?userId=${userInfo.value.id}` });
		if(res.data.success) {
			achievementList.value = res.data.achievements;
		} else {
            // 请求失败也视为空列表
            achievementList.value = [];
        }
	} catch (error) {
		console.error("Failed to fetch achievements:", error);
        achievementList.value = [];
	} finally {
		isLoading.value = false;
	}
};

onShow(() => {
	userInfo.value = uni.getStorageSync('user_info');
	if (!userInfo.value) {
		uni.showModal({
			title: '提示',
			content: '请先登录查看成就',
			showCancel: false,
			success: () => uni.switchTab({ url: '/pages/profile/profile' })
		});
	} else {
		fetchAchievements();
	}
});
</script>

<style lang="scss" scoped>
.page-container {
	padding: 24rpx;
	background-color: #f3f4f6;
	min-height: 100vh;
}
.loading-state, .empty-state { 
    padding-top: 30vh; 
}

.achievements-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 24rpx;
}

.badge-card {
	background-color: #fff;
	border-radius: 16rpx;
	padding: 30rpx 20rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	position: relative;
	overflow: hidden;
	box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.05);

	.badge-icon {
		width: 120rpx;
		height: 120rpx;
		margin-bottom: 16rpx;
		transition: filter 0.3s ease;
	}
	.badge-name {
		font-size: 28rpx;
		font-weight: 500;
		color: #333;
		transition: color 0.3s ease;
	}
	.badge-desc {
		font-size: 22rpx;
		color: #999;
		margin-top: 8rpx;
		transition: color 0.3s ease;
	}

	&:not(.earned) {
		.badge-icon {
			filter: grayscale(100%);
		}
		.badge-name, .badge-desc {
			color: #c0c4cc;
		}
	}
	
	.lock-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(100,100,100,0.3);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

    &:not(.earned):hover .lock-overlay {
        opacity: 1;
    }
}
</style>