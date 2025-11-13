"use strict";
const common_vendor = require("../../common/vendor.js");
const api_common = require("../../api/common.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_upload2 = common_vendor.resolveComponent("u-upload");
  const _easycom_u__input2 = common_vendor.resolveComponent("u--input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u__textarea2 = common_vendor.resolveComponent("u--textarea");
  const _easycom_u__form2 = common_vendor.resolveComponent("u--form");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_icon2 + _easycom_u_upload2 + _easycom_u__input2 + _easycom_u_form_item2 + _easycom_u__textarea2 + _easycom_u__form2 + _easycom_u_button2)();
}
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_upload = () => "../../uni_modules/uview-plus/components/u-upload/u-upload.js";
const _easycom_u__input = () => "../../uni_modules/uview-plus/components/u--input/u--input.js";
const _easycom_u_form_item = () => "../../uni_modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_u__textarea = () => "../../uni_modules/uview-plus/components/u--textarea/u--textarea.js";
const _easycom_u__form = () => "../../uni_modules/uview-plus/components/u--form/u--form.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_upload + _easycom_u__input + _easycom_u_form_item + _easycom_u__textarea + _easycom_u__form + _easycom_u_button)();
}
const _sfc_main = {
  __name: "post",
  setup(__props) {
    const fileList = common_vendor.ref([]);
    const form = common_vendor.reactive({ title: "", description: "", artCategory: "", imageFile: null });
    const userInfo = common_vendor.ref(null);
    const artCategories = common_vendor.ref([]);
    const selectedMainCategory = common_vendor.ref("");
    const isPublishing = common_vendor.ref(false);
    const subCategoryOptions = common_vendor.computed(() => {
      if (!selectedMainCategory.value)
        return [];
      const mainCat = artCategories.value.find((cat) => cat.category === selectedMainCategory.value);
      return mainCat ? mainCat.sub_categories : [];
    });
    const publishBtnStyle = common_vendor.computed(() => ({
      background: "linear-gradient(to right, #008585, #004343)",
      color: "#fff",
      height: "90rpx",
      borderRadius: "45rpx",
      border: "none",
      boxShadow: "0 8rpx 20rpx rgba(0, 133, 133, 0.3)"
    }));
    const fetchArtCategories = async () => {
      try {
        const res = await api_common.getArtStylesApi();
        artCategories.value = res.art_styles || [];
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/post/post.vue:107", "获取艺术分类失败:", error);
      }
    };
    const publish = () => {
      if (!form.imageFile)
        return common_vendor.index.showToast({ title: "请上传作品图片", icon: "none" });
      if (!form.title)
        return common_vendor.index.showToast({ title: "请填写作品标题", icon: "none" });
      if (!form.artCategory)
        return common_vendor.index.showToast({ title: "请选择艺术分类", icon: "none" });
      isPublishing.value = true;
      common_vendor.index.showLoading({ title: "正在发布..." });
      let uploadResult = { success: false, message: "上传失败，请重试" };
      common_vendor.index.uploadFile({
        url: "http://localhost:3000/api/posts",
        filePath: form.imageFile.url,
        name: "image",
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
              uploadResult = { success: true, message: "发布成功！" };
            } else {
              uploadResult.message = data.message || "发布失败";
            }
          } catch (e) {
            common_vendor.index.__f__("error", "at pages/post/post.vue:147", "解析上传响应失败:", e);
            uploadResult.message = "服务器响应格式错误";
          }
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/post/post.vue:152", "上传请求失败:", err);
          uploadResult.message = "网络请求失败";
        },
        // 4. 在 complete 回调中统一处理UI反馈
        complete: () => {
          common_vendor.index.hideLoading();
          isPublishing.value = false;
          if (uploadResult.success) {
            common_vendor.index.showToast({ title: uploadResult.message, icon: "success" });
            common_vendor.index.$emit("post-success");
            setTimeout(() => common_vendor.index.navigateBack(), 1500);
          } else {
            common_vendor.index.showToast({ title: uploadResult.message, icon: "error" });
          }
        }
      });
    };
    const afterRead = (event) => {
      fileList.value.push({ ...event.file, status: "uploading", message: "上传中" });
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
    common_vendor.onMounted(() => {
      userInfo.value = common_vendor.index.getStorageSync("user_info");
      if (!userInfo.value) {
        common_vendor.index.showModal({
          title: "提示",
          content: "请先登录再发布作品",
          showCancel: false,
          success: () => common_vendor.index.switchTab({ url: "/pages/profile/profile" })
        });
        return;
      }
      fetchArtCategories();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          name: "camera",
          color: "#c0c4cc",
          size: "40"
        }),
        b: common_vendor.o(afterRead),
        c: common_vendor.o(deletePic),
        d: common_vendor.p({
          fileList: fileList.value,
          name: "image",
          maxCount: 1,
          width: "200",
          height: "200"
        }),
        e: common_vendor.o(($event) => form.title = $event),
        f: common_vendor.p({
          placeholder: "给作品起个名字吧",
          border: "bottom",
          modelValue: form.title
        }),
        g: common_vendor.p({
          label: "作品标题",
          prop: "title",
          required: true
        }),
        h: common_vendor.o(($event) => form.description = $event),
        i: common_vendor.p({
          placeholder: "可以分享一下创作心得、使用工具等...",
          count: true,
          autoHeight: true,
          modelValue: form.description
        }),
        j: common_vendor.p({
          label: "作品描述",
          prop: "description"
        }),
        k: common_vendor.sr("formRef", "0832fc77-2"),
        l: common_vendor.p({
          labelPosition: "top",
          model: form
        }),
        m: common_vendor.f(artCategories.value, (cat, k0, i0) => {
          return {
            a: common_vendor.t(cat.category),
            b: cat.id,
            c: selectedMainCategory.value === cat.category ? 1 : "",
            d: common_vendor.o(($event) => selectMainCategory(cat), cat.id)
          };
        }),
        n: subCategoryOptions.value.length > 0
      }, subCategoryOptions.value.length > 0 ? {
        o: common_vendor.f(subCategoryOptions.value, (sub, k0, i0) => {
          return {
            a: common_vendor.t(sub.name),
            b: sub.id,
            c: form.artCategory === sub.name ? 1 : "",
            d: common_vendor.o(($event) => selectSubCategory(sub), sub.id)
          };
        })
      } : {}, {
        p: common_vendor.o(publish),
        q: common_vendor.p({
          text: "确认发布",
          size: "large",
          customStyle: publishBtnStyle.value,
          loading: isPublishing.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0832fc77"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/post/post.js.map
