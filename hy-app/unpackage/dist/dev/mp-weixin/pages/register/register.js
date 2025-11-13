"use strict";
const common_vendor = require("../../common/vendor.js");
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
  __name: "register",
  setup(__props) {
    const form = common_vendor.reactive({
      nickname: "",
      username: "",
      password: "",
      confirmPassword: ""
    });
    const isProcessing = common_vendor.ref(false);
    const registerBtnStyle = common_vendor.computed(() => ({
      background: "linear-gradient(to right, #008585, #004343)",
      color: "#fff",
      marginTop: "60rpx",
      height: "90rpx",
      borderRadius: "45rpx",
      border: "none"
    }));
    const handleRegister = async () => {
      if (!form.nickname || !form.username || !form.password) {
        return common_vendor.index.showToast({ title: "请填写所有必填项", icon: "none" });
      }
      if (form.password !== form.confirmPassword) {
        return common_vendor.index.showToast({ title: "两次输入的密码不一致", icon: "none" });
      }
      if (isProcessing.value)
        return;
      isProcessing.value = true;
      try {
        await api_user.registerApi({
          username: form.username,
          password: form.password,
          nickname: form.nickname
        });
        common_vendor.index.showToast({ title: "注册成功！即将跳转登录", icon: "success" });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/register/register.vue:84", "注册失败:", error);
      } finally {
        isProcessing.value = false;
      }
    };
    const goBackToLogin = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => form.nickname = $event),
        b: common_vendor.p({
          placeholder: "请输入昵称",
          border: "bottom",
          clearable: true,
          modelValue: form.nickname
        }),
        c: common_vendor.o(($event) => form.username = $event),
        d: common_vendor.p({
          placeholder: "请输入用户名 (用于登录)",
          border: "bottom",
          clearable: true,
          modelValue: form.username
        }),
        e: common_vendor.o(($event) => form.password = $event),
        f: common_vendor.p({
          type: "password",
          placeholder: "请输入密码",
          border: "bottom",
          clearable: true,
          modelValue: form.password
        }),
        g: common_vendor.o(($event) => form.confirmPassword = $event),
        h: common_vendor.p({
          type: "password",
          placeholder: "请再次确认密码",
          border: "bottom",
          clearable: true,
          modelValue: form.confirmPassword
        }),
        i: common_vendor.sr("formRef", "bac4a35d-0"),
        j: common_vendor.p({
          labelPosition: "top",
          model: form
        }),
        k: common_vendor.o(handleRegister),
        l: common_vendor.p({
          text: "注 册",
          size: "large",
          customStyle: registerBtnStyle.value,
          loading: isProcessing.value
        }),
        m: common_vendor.o(goBackToLogin)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bac4a35d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/register/register.js.map
