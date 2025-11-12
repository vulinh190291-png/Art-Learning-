"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
if (!Array) {
  const _easycom_u_avatar2 = common_vendor.resolveComponent("u-avatar");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u__input2 = common_vendor.resolveComponent("u--input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u__textarea2 = common_vendor.resolveComponent("u--textarea");
  const _easycom_u__form2 = common_vendor.resolveComponent("u--form");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_avatar2 + _easycom_u_icon2 + _easycom_u__input2 + _easycom_u_form_item2 + _easycom_u__textarea2 + _easycom_u__form2 + _easycom_u_button2)();
}
const _easycom_u_avatar = () => "../../uni_modules/uview-plus/components/u-avatar/u-avatar.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u__input = () => "../../uni_modules/uview-plus/components/u--input/u--input.js";
const _easycom_u_form_item = () => "../../uni_modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_u__textarea = () => "../../uni_modules/uview-plus/components/u--textarea/u--textarea.js";
const _easycom_u__form = () => "../../uni_modules/uview-plus/components/u--form/u--form.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_avatar + _easycom_u_icon + _easycom_u__input + _easycom_u_form_item + _easycom_u__textarea + _easycom_u__form + _easycom_u_button)();
}
const _sfc_main = {
  __name: "profile_edit",
  setup(__props) {
    const userInfo = common_vendor.ref({});
    const isProcessing = common_vendor.ref(false);
    const form = common_vendor.reactive({
      avatar: "/static/logo.png",
      nickname: "",
      bio: ""
    });
    const saveBtnStyle = common_vendor.computed(() => ({
      background: "linear-gradient(to right, #008585, #74a892)",
      color: "#fff",
      border: "none",
      height: "90rpx",
      borderRadius: "45rpx"
    }));
    const changeAvatar = () => {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          const tempFilePath = res.tempFilePaths[0];
          common_vendor.index.showLoading({ title: "上传中..." });
          let uploadResult = { success: false, message: "上传失败" };
          common_vendor.index.uploadFile({
            url: "http://localhost:3000/api/upload-avatar",
            filePath: tempFilePath,
            name: "avatar",
            formData: { "userId": userInfo.value.id },
            success: (uploadRes) => {
              try {
                const data = JSON.parse(uploadRes.data);
                if (data.success) {
                  uploadResult = { success: true, message: "头像更新成功", avatarUrl: data.avatarUrl };
                } else {
                  uploadResult.message = data.message || "上传失败";
                }
              } catch (e) {
                common_vendor.index.__f__("error", "at pages/profile_edit/profile_edit.vue:83", "解析头像上传响应失败:", e);
                uploadResult.message = "服务器响应格式错误";
              }
            },
            fail: (err) => {
              common_vendor.index.__f__("error", "at pages/profile_edit/profile_edit.vue:88", "头像上传请求失败:", err);
              uploadResult.message = "网络请求失败";
            },
            complete: () => {
              common_vendor.index.hideLoading();
              if (uploadResult.success) {
                userInfo.value.avatar = uploadResult.avatarUrl;
                form.avatar = uploadResult.avatarUrl;
                common_vendor.index.setStorageSync("user_info", userInfo.value);
                common_vendor.index.showToast({ title: uploadResult.message, icon: "success" });
              } else {
                common_vendor.index.showToast({ title: uploadResult.message, icon: "error" });
              }
            }
          });
        }
      });
    };
    const saveProfile = async () => {
      if (!form.nickname.trim()) {
        return common_vendor.index.showToast({ title: "昵称不能为空", icon: "none" });
      }
      if (isProcessing.value)
        return;
      isProcessing.value = true;
      try {
        const res = await api_user.updateProfileApi({
          userId: userInfo.value.id,
          nickname: form.nickname,
          bio: form.bio
        });
        common_vendor.index.setStorageSync("user_info", res.user);
        common_vendor.index.showToast({ title: "保存成功", icon: "success" });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1e3);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/profile_edit/profile_edit.vue:136", "保存资料失败:", error);
      } finally {
        isProcessing.value = false;
      }
    };
    common_vendor.onShow(() => {
      const user = common_vendor.index.getStorageSync("user_info");
      if (user) {
        userInfo.value = user;
        form.avatar = user.avatar || "/static/logo.png";
        form.nickname = user.nickname || "";
        form.bio = user.bio || "";
      } else {
        common_vendor.index.navigateBack();
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          src: form.avatar,
          size: "80"
        }),
        b: common_vendor.p({
          name: "camera-fill",
          color: "#fff",
          size: "24"
        }),
        c: common_vendor.o(changeAvatar),
        d: common_vendor.o(($event) => form.nickname = $event),
        e: common_vendor.p({
          placeholder: "请输入昵称",
          border: "none",
          inputAlign: "right",
          modelValue: form.nickname
        }),
        f: common_vendor.p({
          label: "昵称",
          prop: "nickname",
          borderBottom: true,
          required: true
        }),
        g: common_vendor.o(($event) => form.bio = $event),
        h: common_vendor.p({
          placeholder: "介绍一下自己吧",
          count: true,
          maxlength: "100",
          height: "80",
          modelValue: form.bio
        }),
        i: common_vendor.p({
          label: "个人简介",
          prop: "bio",
          labelPosition: "top"
        }),
        j: common_vendor.p({
          model: form,
          labelPosition: "left",
          labelWidth: "70"
        }),
        k: common_vendor.o(saveProfile),
        l: common_vendor.p({
          type: "primary",
          customStyle: saveBtnStyle.value,
          text: "保 存",
          loading: isProcessing.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-292c5867"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile_edit/profile_edit.js.map
