<template>
	<view class="page-container">
		<map
			v-if="isMapReady"
			id="locationMap"
			class="map-component"
			:longitude="longitude"
			:latitude="latitude"
			:scale="16"
			:show-location="true"
			@regionchange="onRegionChange"
		></map>
		
		<view v-else class="map-loading-placeholder">
			<u-loading-icon mode="circle" text="正在加载地图..." size="26"></u-loading-icon>
		</view>

		<template v-if="isMapReady">
			<view class="center-marker">
				<u-icon name="map-fill" color="#c7522a" size="34"></u-icon>
			</view>
			
			<view class="address-panel">
				<view v-if="panelLoading" class="loading-text">
					<u-loading-icon mode="circle" text="正在解析地址..." size="16"></u-loading-icon>
				</view>
				<template v-else>
					<view class="title u-line-1">{{ selectedAddress.title }}</view>
					<view class="desc u-line-2">{{ selectedAddress.address }}</view>
				</template>
			</view>

			<view class="bottom-button">
				<u-button 
					type="primary" 
					text="确认选择该位置" 
					:disabled="panelLoading || !selectedAddress.title"
					:customStyle="confirmBtnStyle"
					@click="confirmSelection"
				></u-button>
			</view>
		</template>
	</view>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const longitude = ref(116.4074); // 默认经度 (北京)，作为定位失败的备用
const latitude = ref(39.9042);  // 默认纬度
const mapCtx = ref(null);
const panelLoading = ref(true);
const regionChangeTimer = ref(null);
const isMapReady = ref(false); // 地图是否准备就绪的标志

const selectedAddress = reactive({
	title: '',
	address: '',
	province: '',
	city: '',
	district: ''
});

const confirmBtnStyle = { 
	background: 'linear-gradient(to right, #008585, #74a892)', 
	color: '#fff', 
	border: 'none', 
	height: '90rpx'
};

onLoad(() => {
	uni.getLocation({
		type: 'gcj02',
		success: (res) => {
			longitude.value = res.longitude;
			latitude.value = res.latitude;
		},
		fail: () => {
			uni.showToast({ title: '定位失败，将使用默认位置', icon: 'none' });
		},
		complete: () => {
			isMapReady.value = true;
			nextTick(() => {
				mapCtx.value = uni.createMapContext("locationMap");
				getCenterLocationAndReverseGeocode();
			});
		}
	});
});

const onRegionChange = (e) => {
	if (e.type === 'end' && (e.causedBy === 'drag' || e.causedBy === 'scale')) {
		panelLoading.value = true;
		if (regionChangeTimer.value) {
			clearTimeout(regionChangeTimer.value);
		}
		regionChangeTimer.value = setTimeout(() => {
			getCenterLocationAndReverseGeocode();
		}, 300);
	}
};

const getCenterLocationAndReverseGeocode = () => {
	if (!mapCtx.value) return;
	mapCtx.value.getCenterLocation({
		success: (res) => {
			reverseGeocode(res.latitude, res.longitude);
		},
		fail: () => {
			panelLoading.value = false;
			uni.showToast({ title: '获取中心点失败', icon: 'error' });
		}
	});
};

const reverseGeocode = (lat, lng) => {
	uni.request({
		url: 'http://localhost:3000/api/maps/reverse-geocode', 
		data: { lat, lng },
		success: (res) => {
			if (res.data.status === 0) {
				const result = res.data.result;
				if (result.formatted_addresses) {
					selectedAddress.title = result.formatted_addresses.recommend || result.formatted_addresses.rough || result.address;
				} else {
					selectedAddress.title = result.address;
				}
				selectedAddress.address = result.address;
				selectedAddress.province = result.address_component.province;
				selectedAddress.city = result.address_component.city;
				selectedAddress.district = result.address_component.district;
			} else {
				selectedAddress.title = "无法解析当前位置";
				selectedAddress.address = `错误: ${res.data.message}`;
			}
		},
		fail: () => {
			selectedAddress.title = "网络错误";
			selectedAddress.address = "无法连接到本地后端服务";
		},
		complete: () => {
			panelLoading.value = false;
		}
	});
};

const confirmSelection = () => {
	const dataToEmit = {
		region: `${selectedAddress.province} ${selectedAddress.city} ${selectedAddress.district}`,
		detail: selectedAddress.address.replace(selectedAddress.province, '').replace(selectedAddress.city, '').replace(selectedAddress.district, '')
	};

	try {
		const eventChannel = uni.getOpenerEventChannel();
		eventChannel.emit('acceptDataFromMap', dataToEmit);
	} catch (e) {
		uni.setStorageSync('map_selected_address', dataToEmit);
	}
	
	uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.page-container {
	position: relative;
	width: 100vw;
	height: 100vh;
}
.map-component {
	width: 100%;
	height: 100%;
}
.map-loading-placeholder {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #f0f0f0;
}
.center-marker {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -100%);
	z-index: 10;
}
.address-panel {
	position: absolute;
	bottom: 160rpx;
	left: 24rpx;
	right: 24rpx;
	background-color: #fff;
	border-radius: 16rpx;
	padding: 30rpx;
	box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.1);
	z-index: 10;
	min-height: 150rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.loading-text {
	display: flex;
	justify-content: center;
	align-items: center;
}
.title {
	font-size: 32rpx;
	font-weight: 500;
	color: #333;
	margin-bottom: 10rpx;
}
.desc {
	font-size: 26rpx;
	color: #666;
}
.bottom-button {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 20rpx 40rpx;
	background: #fff;
	z-index: 10;
	padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
}
</style>