<template>
	<view class="page-container">
		<!-- 图片上传 -->
		<view class="card">
			<u-upload
				:fileList="fileList"
				@afterRead="afterRead"
				@delete="deletePic"
				name="image"
				:maxCount="1"
				width="200"
				height="200"
			>
				<view class="upload-placeholder">
					<u-icon name="camera" color="#c0c4cc" size="40"></u-icon>
					<text class="placeholder-text">上传作品图片 (必填)</text>
				</view>
			</u-upload>
		</view>

		<!-- 表单输入 -->
		<view class="card">
			<u--form labelPosition="top" :model="form" ref="formRef">
				<u-form-item label="作品标题" prop="title" required>
					<u--input v-model="form.title" placeholder="给作品起个名字吧" border="bottom"></u--input>
				</u-form-item>
				<u-form-item label="作品描述" prop="description">
					<u--textarea v-model="form.description" placeholder="可以分享一下创作心得、使用工具等..." count autoHeight></u--textarea>
				</u-form-item>
			</u--form>
		</view>
		
		<!-- 分类选择 -->
		<view class="card">
			<view class="category-title">艺术分类 (必选其一)</view>
			<scroll-view scroll-x class="category-scroll">
				<view 
					v-for="cat in artCategories" 
					:key="cat.id" 
					class="category-tag"
					:class="{ 'active': selectedMainCategory === cat.category }"
					@click="selectMainCategory(cat)"
				>
					{{ cat.category }}
				</view>
			</scroll-view>
			<scroll-view scroll-x class="category-scroll sub-category-scroll" v-if="subCategoryOptions.length > 0">
				<view 
					v-for="sub in subCategoryOptions" 
					:key="sub.id" 
					class="category-tag"
					:class="{ 'active': form.artCategory === sub.name }"
					@click="selectSubCategory(sub)"
				>
					{{ sub.name }}
				</view>
			</scroll-view>
		</view>

		<!-- 发布按钮 -->
		<view class="publish-button-wrapper">
			<u-button
				text="确认发布"
				size="large"
				:customStyle="publishBtnStyle"
				@click="publish"
				:loading="isPublishing"
			></u-button>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { getArtStylesApi } from '@/api/common.js';

// --- 响应式变量 ---
const fileList = ref([]);
const form = reactive({ title: '', description: '', artCategory: '', imageFile: null });
const userInfo = ref(null);
const artCategories = ref([]);
const selectedMainCategory = ref('');
const isPublishing = ref(false);

// --- 计算属性 ---
const subCategoryOptions = computed(() => {
	if (!selectedMainCategory.value) return [];
	const mainCat = artCategories.value.find(cat => cat.category === selectedMainCategory.value);
	return mainCat ? mainCat.sub_categories : [];
});

const publishBtnStyle = computed(() => ({
	background: 'linear-gradient(to right, #008585, #004343)',
	color: '#fff',
	height: '90rpx',
	borderRadius: '45rpx',
	border: 'none',
	boxShadow: '0 8rpx 20rpx rgba(0, 133, 133, 0.3)'
}));

// --- API 调用函数 ---
const fetchArtCategories = async () => {
	try {
		const res = await getArtStylesApi();
		artCategories.value = res.art_styles || [];
	} catch (error) {
		console.error("获取艺术分类失败:", error);
	}
};

/**
 * @description 发布作品 (包含文件上传)
 * @note 采用更稳健的回调处理方式，确保 showLoading/hideLoading 配对。
 */
const publish = () => {
	// 1. 表单验证
	if (!form.imageFile) return uni.showToast({ title: '请上传作品图片', icon: 'none' });
	if (!form.title) return uni.showToast({ title: '请填写作品标题', icon: 'none' });
	if (!form.artCategory) return uni.showToast({ title: '请选择艺术分类', icon: 'none' });
	
	isPublishing.value = true;
	uni.showLoading({ title: '正在发布...' });

    // 2. 定义一个变量来存储请求结果
    let uploadResult = { success: false, message: '上传失败，请重试' };

	uni.uploadFile({
		url: 'http://localhost:3000/api/posts',
		filePath: form.imageFile.url,
		name: 'image',
		formData: {
			userId: userInfo.value.id,
			title: form.title,
			description: form.description,
			artCategory: form.artCategory
		},
		// 3. success/fail 回调只负责记录结果
		success: (uploadRes) => {
			try {
                const data = JSON.parse(uploadRes.data);
                if (data.success) {
                    uploadResult = { success: true, message: '发布成功！' };
                } else {
                    uploadResult.message = data.message || '发布失败';
                }
            } catch (e) {
                console.error("解析上传响应失败:", e);
                uploadResult.message = '服务器响应格式错误';
            }
		},
		fail: (err) => {
			console.error("上传请求失败:", err);
			uploadResult.message = '网络请求失败';
		},
		// 4. 在 complete 回调中统一处理UI反馈
		complete: () => {
			// 4a. 立即关闭 loading
			uni.hideLoading();
			isPublishing.value = false;

            // 4b. 根据结果进行后续操作
            if (uploadResult.success) {
                uni.showToast({ title: uploadResult.message, icon: 'success' });
				uni.$emit('post-success');
				setTimeout(() => uni.navigateBack(), 1500);
            } else {
                uni.showToast({ title: uploadResult.message, icon: 'error' });
            }
		}
	});
};

// --- 页面逻辑与事件处理 ---
const afterRead = (event) => {
	fileList.value.push({ ...event.file, status: 'uploading', message: '上传中' });
	form.imageFile = event.file;
};

const deletePic = () => {
	fileList.value.pop();
	form.imageFile = null;
};

const selectMainCategory = (cat) => {
	selectedMainCategory.value = cat.category;
	form.artCategory = cat.category;
};

const selectSubCategory = (sub) => {
	form.artCategory = sub.name;
};

// --- 生命周期函数 ---
onMounted(() => {
	userInfo.value = uni.getStorageSync('user_info');
	if (!userInfo.value) {
		uni.showModal({
			title: '提示',
			content: '请先登录再发布作品',
			showCancel: false,
			success: () => uni.switchTab({ url: '/pages/profile/profile' })
		});
		return;
	}
	fetchArtCategories();
});
</script>

<style lang="scss" scoped>
.page-container {
	background-color: #f3f4f6;
	padding: 24rpx;
	min-height: 100vh;
}
.card {
	background-color: #fff;
	border-radius: 16rpx;
	padding: 30rpx;
	margin-bottom: 24rpx;
	box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.04);
}
.upload-placeholder {
	background-color: #f9fafb;
	border: 1px dashed #d1d5db;
	border-radius: 8rpx;
	width: 200rpx;
	height: 200rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.placeholder-text {
	font-size: 24rpx;
	color: #9ca3af;
	margin-top: 10rpx;
}
.category-title {
	font-size: 30rpx;
	color: #303133;
	margin-bottom: 20rpx;
	font-weight: 500;
}
.category-scroll {
	white-space: nowrap;
	.category-tag {
		display: inline-block;
		background-color: #f3f4f6;
		color: #606266;
		padding: 12rpx 28rpx;
		border-radius: 30rpx;
		margin-right: 20rpx;
		font-size: 26rpx;
		transition: all 0.2s ease-in-out;
		&.active {
			background-color: #008585;
			color: #fff;
			font-weight: 500;
		}
	}
}
.sub-category-scroll {
	margin-top: 20rpx;
}
.publish-button-wrapper {
	padding: 20rpx;
}
</style>
