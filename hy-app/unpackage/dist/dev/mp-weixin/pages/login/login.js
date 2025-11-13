"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_user = require("../../api/user.js");
if (!Array) {
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u__form2 = common_vendor.resolveComponent("u--form");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_input2 + _easycom_u_form_item2 + _easycom_u__form2 + _easycom_u_button2)();
}
const _easycom_u_input = () => "../../uni_modules/uview-plus/components/u-input/u-input.js";
const _easycom_u_form_item = () => "../../uni_modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_u__form = () => "../../uni_modules/uview-plus/components/u--form/u--form.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_input + _easycom_u_form_item + _easycom_u__form + _easycom_u_button)();
}
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const isProcessing = common_vendor.ref(false);
    const form = common_vendor.reactive({
      username: "zhangsan",
      password: "123"
    });
    const loginBtnStyle = common_vendor.computed(() => ({
      background: "linear-gradient(to right, #008585, #004343)",
      color: "#fff",
      marginTop: "40rpx",
      height: "90rpx",
      borderRadius: "45rpx",
      border: "none"
    }));
    const submit = async () => {
      if (isProcessing.value)
        return;
      if (!form.username || !form.password) {
        common_vendor.index.showToast({ title: "请输入用户名和密码", icon: "none" });
        return;
      }
      isProcessing.value = true;
      try {
        const res = await api_user.loginApi(form);
        common_vendor.index.setStorageSync("user_info", res.user);
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 800);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/login/login.vue:73", "登录失败:", error);
      } finally {
        isProcessing.value = false;
      }
    };
    const goToRegister = () => {
      common_vendor.index.navigateTo({
        url: "/pages/register/register"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.o(($event) => form.username = $event),
        c: common_vendor.p({
          placeholder: "请输入用户名",
          prefixIcon: "account-fill",
          clearable: true,
          modelValue: form.username
        }),
        d: common_vendor.p({
          labelWidth: "0"
        }),
        e: common_vendor.o(($event) => form.password = $event),
        f: common_vendor.p({
          type: "password",
          placeholder: "请输入密码",
          prefixIcon: "lock-fill",
          clearable: true,
          modelValue: form.password
        }),
        g: common_vendor.p({
          labelWidth: "0"
        }),
        h: common_vendor.sr("loginForm", "e4e4508d-0"),
        i: common_vendor.p({
          labelPosition: "left",
          model: form
        }),
        j: common_vendor.o(submit),
        k: common_vendor.p({
          text: "登 录",
          size: "large",
          customStyle: loginBtnStyle.value
        }),
        l: common_vendor.o(goToRegister)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
