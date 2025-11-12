<template>
	<view class="page-container">
		<u--form labelPosition="left" :model="form" ref="uForm" labelWidth="80">
			<u-form-item label="收 货 人" prop="name" borderBottom>
				<u--input v-model="form.name" placeholder="请填写收货人姓名" border="none"></u--input>
			</u-form-item>
			<u-form-item label="手机号码" prop="phone" borderBottom>
				<u--input v-model="form.phone" type="number" placeholder="请填写11位手机号码" border="none" maxlength="11"></u--input>
			</u-form-item>
			<u-form-item label="所在地区" prop="region" borderBottom @click="showRegionPicker = true">
				<u--input v-model="form.region" disabled disabledColor="#ffffff" placeholder="省、市、区" border="none"></u--input>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-form-item label="详细地址" prop="detail" borderBottom>
				<u--textarea v-model="form.detail" placeholder="街道、楼牌号等" border="none" autoHeight></u--textarea>
				<template #right>
					<u-button
						icon="map"
						type="primary"
						size="mini"
						text="地图选择"
						:customStyle="mapBtnStyle"
						@click="openMap"
					></u-button>
				</template>
			</u-form-item>
			<u-form-item label="设为默认" prop="isDefault">
				<u-switch v-model="form.isDefault" :activeColor="switchActiveColor"></u-switch>
			</u-form-item>
		</u--form>

		<view class="bottom-button">
			<u-button type="primary" :customStyle="saveBtnStyle" text="保存" @click="submit"></u-button>
		</view>
		
		<u-picker :show="showRegionPicker" :columns="regionColumns" @confirm="regionConfirm" @cancel="showRegionPicker = false"></u-picker>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { addAddressApi, updateAddressApi } from '@/api/address.js';

// --- 变量声明 ---
const isProcessing = ref(false);
const uForm = ref(null);
const userInfo = ref(null);
const pageMode = ref('add');
const form = reactive({
	id: null,
	name: '',
	phone: '',
	region: '',
	detail: '',
	isDefault: false
});

// --- 静态数据 ---
const showRegionPicker = ref(false);
const saveBtnStyle = { background: 'linear-gradient(to right, #008585, #74a892)', color: '#fff', border: 'none', height: '90rpx' };
const mapBtnStyle = { backgroundColor: '#f0daa5', color: '#c7522a', border: 'none', width: '180rpx' };
const switchActiveColor = '#008585';
const regionColumns = [
	['广东省', '湖南省', '北京市', '上海市'],
	['深圳市', '长沙市', '北京市', '上海市'],
	['南山区', '岳麓区', '海淀区', '浦东新区']
];

// --- 函数 ---
onLoad((options) => {
	userInfo.value = uni.getStorageSync('user_info');
	if (options.addressData) {
		pageMode.value = 'edit';
		const address = JSON.parse(decodeURIComponent(options.addressData));
		Object.assign(form, address);
		uni.setNavigationBarTitle({ title: '编辑收货地址' });
	} else {
		pageMode.value = 'add';
		uni.setNavigationBarTitle({ title: '新增收货地址' });
	}
});

onShow(() => {
	const mapData = uni.getStorageSync('map_selected_address');
	if (mapData) {
		form.region = mapData.region;
		form.detail = mapData.detail;
		uni.removeStorageSync('map_selected_address');
	}
});

const regionConfirm = (e) => {
	form.region = e.value.join(' ');
	showRegionPicker.value = false;
};

const openMap = () => {
	uni.navigateTo({
		url: '/pages/map_picker/map_picker'
	});
};

const submit = async () => {
	if (isProcessing.value) return;

	// 表单验证
	if (!form.name || !form.phone || !form.region || !form.detail) {
		return uni.showToast({ title: '请填写完整的地址信息', icon: 'none' });
	}
	const phoneRegex = /^1\d{10}$/;
	if (!phoneRegex.test(form.phone)) {
		return uni.showToast({ title: '请输入正确的11位手机号码', icon: 'none' });
	}
	
	isProcessing.value = true;
	
	try {
		const requestData = {
			userId: userInfo.value.id,
			...form
		};

		let res;
		if (pageMode.value === 'edit') {
			res = await updateAddressApi(form.id, requestData);
		} else {
			res = await addAddressApi(requestData);
		}

		uni.showToast({
			title: res.message || '保存成功',
			icon: 'none' 
		});
		
		// 延时跳转
		setTimeout(() => {
			uni.navigateBack();
		}, 800);

	} catch (error) {
		console.error("地址保存失败:", error);
	} finally {
		isProcessing.value = false;
	}
};
</script>

<style lang="scss" scoped>
.page-container {
	padding: 24rpx;
	background-color: #fff;
	min-height: 100vh;
}

.bottom-button {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 20rpx 40rpx;
	background: #fff;
	border-top: 1rpx solid #f0f0f0;
	padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
}
</style>
