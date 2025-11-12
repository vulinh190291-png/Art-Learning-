"use strict";
const common_vendor = require("../../common/vendor.js");
const api_address = require("../../api/address.js");
if (!Array) {
  const _easycom_u__input2 = common_vendor.resolveComponent("u--input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u__textarea2 = common_vendor.resolveComponent("u--textarea");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_switch2 = common_vendor.resolveComponent("u-switch");
  const _easycom_u__form2 = common_vendor.resolveComponent("u--form");
  const _easycom_u_picker2 = common_vendor.resolveComponent("u-picker");
  (_easycom_u__input2 + _easycom_u_form_item2 + _easycom_u_icon2 + _easycom_u__textarea2 + _easycom_u_button2 + _easycom_u_switch2 + _easycom_u__form2 + _easycom_u_picker2)();
}
const _easycom_u__input = () => "../../uni_modules/uview-plus/components/u--input/u--input.js";
const _easycom_u_form_item = () => "../../uni_modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u__textarea = () => "../../uni_modules/uview-plus/components/u--textarea/u--textarea.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_switch = () => "../../uni_modules/uview-plus/components/u-switch/u-switch.js";
const _easycom_u__form = () => "../../uni_modules/uview-plus/components/u--form/u--form.js";
const _easycom_u_picker = () => "../../uni_modules/uview-plus/components/u-picker/u-picker.js";
if (!Math) {
  (_easycom_u__input + _easycom_u_form_item + _easycom_u_icon + _easycom_u__textarea + _easycom_u_button + _easycom_u_switch + _easycom_u__form + _easycom_u_picker)();
}
const switchActiveColor = "#008585";
const _sfc_main = {
  __name: "address_edit",
  setup(__props) {
    const isProcessing = common_vendor.ref(false);
    const uForm = common_vendor.ref(null);
    const userInfo = common_vendor.ref(null);
    const pageMode = common_vendor.ref("add");
    const form = common_vendor.reactive({
      id: null,
      name: "",
      phone: "",
      region: "",
      detail: "",
      isDefault: false
    });
    const showRegionPicker = common_vendor.ref(false);
    const saveBtnStyle = { background: "linear-gradient(to right, #008585, #74a892)", color: "#fff", border: "none", height: "90rpx" };
    const mapBtnStyle = { backgroundColor: "#f0daa5", color: "#c7522a", border: "none", width: "180rpx" };
    const regionColumns = [
      ["广东省", "湖南省", "北京市", "上海市"],
      ["深圳市", "长沙市", "北京市", "上海市"],
      ["南山区", "岳麓区", "海淀区", "浦东新区"]
    ];
    common_vendor.onLoad((options) => {
      userInfo.value = common_vendor.index.getStorageSync("user_info");
      if (options.addressData) {
        pageMode.value = "edit";
        const address = JSON.parse(decodeURIComponent(options.addressData));
        Object.assign(form, address);
        common_vendor.index.setNavigationBarTitle({ title: "编辑收货地址" });
      } else {
        pageMode.value = "add";
        common_vendor.index.setNavigationBarTitle({ title: "新增收货地址" });
      }
    });
    common_vendor.onShow(() => {
      const mapData = common_vendor.index.getStorageSync("map_selected_address");
      if (mapData) {
        form.region = mapData.region;
        form.detail = mapData.detail;
        common_vendor.index.removeStorageSync("map_selected_address");
      }
    });
    const regionConfirm = (e) => {
      form.region = e.value.join(" ");
      showRegionPicker.value = false;
    };
    const openMap = () => {
      common_vendor.index.navigateTo({
        url: "/pages/map_picker/map_picker"
      });
    };
    const submit = async () => {
      if (isProcessing.value)
        return;
      if (!form.name || !form.phone || !form.region || !form.detail) {
        return common_vendor.index.showToast({ title: "请填写完整的地址信息", icon: "none" });
      }
      const phoneRegex = /^1\d{10}$/;
      if (!phoneRegex.test(form.phone)) {
        return common_vendor.index.showToast({ title: "请输入正确的11位手机号码", icon: "none" });
      }
      isProcessing.value = true;
      try {
        const requestData = {
          userId: userInfo.value.id,
          ...form
        };
        let res;
        if (pageMode.value === "edit") {
          res = await api_address.updateAddressApi(form.id, requestData);
        } else {
          res = await api_address.addAddressApi(requestData);
        }
        common_vendor.index.showToast({
          title: res.message || "保存成功",
          icon: "none"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 800);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/address_edit/address_edit.vue:142", "地址保存失败:", error);
      } finally {
        isProcessing.value = false;
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => form.name = $event),
        b: common_vendor.p({
          placeholder: "请填写收货人姓名",
          border: "none",
          modelValue: form.name
        }),
        c: common_vendor.p({
          label: "收 货 人",
          prop: "name",
          borderBottom: true
        }),
        d: common_vendor.o(($event) => form.phone = $event),
        e: common_vendor.p({
          type: "number",
          placeholder: "请填写11位手机号码",
          border: "none",
          maxlength: "11",
          modelValue: form.phone
        }),
        f: common_vendor.p({
          label: "手机号码",
          prop: "phone",
          borderBottom: true
        }),
        g: common_vendor.o(($event) => form.region = $event),
        h: common_vendor.p({
          disabled: true,
          disabledColor: "#ffffff",
          placeholder: "省、市、区",
          border: "none",
          modelValue: form.region
        }),
        i: common_vendor.p({
          name: "arrow-right"
        }),
        j: common_vendor.o(($event) => showRegionPicker.value = true),
        k: common_vendor.p({
          label: "所在地区",
          prop: "region",
          borderBottom: true
        }),
        l: common_vendor.o(($event) => form.detail = $event),
        m: common_vendor.p({
          placeholder: "街道、楼牌号等",
          border: "none",
          autoHeight: true,
          modelValue: form.detail
        }),
        n: common_vendor.o(openMap),
        o: common_vendor.p({
          icon: "map",
          type: "primary",
          size: "mini",
          text: "地图选择",
          customStyle: mapBtnStyle
        }),
        p: common_vendor.p({
          label: "详细地址",
          prop: "detail",
          borderBottom: true
        }),
        q: common_vendor.o(($event) => form.isDefault = $event),
        r: common_vendor.p({
          activeColor: switchActiveColor,
          modelValue: form.isDefault
        }),
        s: common_vendor.p({
          label: "设为默认",
          prop: "isDefault"
        }),
        t: common_vendor.sr(uForm, "f2465368-0", {
          "k": "uForm"
        }),
        v: common_vendor.p({
          labelPosition: "left",
          model: form,
          labelWidth: "80"
        }),
        w: common_vendor.o(submit),
        x: common_vendor.p({
          type: "primary",
          customStyle: saveBtnStyle,
          text: "保存"
        }),
        y: common_vendor.o(regionConfirm),
        z: common_vendor.o(($event) => showRegionPicker.value = false),
        A: common_vendor.p({
          show: showRegionPicker.value,
          columns: regionColumns
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f2465368"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/address_edit/address_edit.js.map
