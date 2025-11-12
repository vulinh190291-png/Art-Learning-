"use strict";
const common_vendor = require("../../common/vendor.js");
const api_address = require("../../api/address.js");
const api_market = require("../../api/market.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_icon2 + _easycom_u_button2)();
}
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_button)();
}
const _sfc_main = {
  __name: "order_confirm",
  setup(__props) {
    const orderItems = common_vendor.ref([]);
    const addressList = common_vendor.ref([]);
    const selectedAddress = common_vendor.ref(null);
    const userInfo = common_vendor.ref(null);
    const isProcessing = common_vendor.ref(false);
    const submitBtnStyle = common_vendor.computed(() => ({
      background: "linear-gradient(to right, #c7522a, #e5c185)",
      color: "#fff",
      border: "none",
      width: "240rpx"
    }));
    const totalPrice = common_vendor.computed(() => {
      return orderItems.value.reduce((sum, item) => {
        return sum + item.productDetails.price * item.quantity;
      }, 0);
    });
    const fetchAddresses = async () => {
      try {
        const res = await api_address.getAddressesApi({ userId: userInfo.value.id });
        if (res.addresses && res.addresses.length > 0) {
          addressList.value = res.addresses;
          selectedAddress.value = res.addresses.find((addr) => addr.isDefault) || res.addresses[0];
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/order_confirm/order_confirm.vue:102", "获取地址列表失败:", error);
      }
    };
    const submitOrder = async () => {
      if (!selectedAddress.value) {
        return common_vendor.index.showToast({ title: "请选择收货地址", icon: "none" });
      }
      if (isProcessing.value)
        return;
      isProcessing.value = true;
      const itemsToSubmit = orderItems.value.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.productDetails.price,
        name: item.productDetails.name,
        coverImage: item.productDetails.coverImage
      }));
      const orderData = {
        userId: userInfo.value.id,
        items: itemsToSubmit,
        totalPrice: totalPrice.value,
        shippingAddress: selectedAddress.value
      };
      try {
        await api_market.createOrderApi(orderData);
        common_vendor.index.showToast({ title: "下单成功！即将跳转", icon: "success" });
        common_vendor.index.removeStorageSync("order_confirm_items");
        common_vendor.index.removeStorageSync("selected_address");
        setTimeout(() => {
          common_vendor.index.redirectTo({
            url: "/pages/order_list/order_list"
          });
        }, 1500);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/order_confirm/order_confirm.vue:144", "提交订单失败:", error);
      } finally {
        isProcessing.value = false;
      }
    };
    const selectAddress = () => {
      common_vendor.index.navigateTo({
        url: "/pages/address_management/address_management?from=order_confirm"
      });
    };
    common_vendor.onLoad(() => {
      userInfo.value = common_vendor.index.getStorageSync("user_info");
      const items = common_vendor.index.getStorageSync("order_confirm_items");
      if (items && items.length > 0) {
        orderItems.value = items;
      } else {
        common_vendor.index.showToast({ title: "没有待结算商品", icon: "error", duration: 2e3 });
        setTimeout(() => common_vendor.index.navigateBack(), 2e3);
        return;
      }
      if (userInfo.value) {
        fetchAddresses();
      }
    });
    common_vendor.onShow(() => {
      const newSelectedAddress = common_vendor.index.getStorageSync("selected_address");
      if (newSelectedAddress) {
        selectedAddress.value = newSelectedAddress;
        common_vendor.index.removeStorageSync("selected_address");
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !selectedAddress.value
      }, !selectedAddress.value ? {
        b: common_vendor.p({
          name: "plus-circle",
          size: "24",
          color: "#c7522a"
        })
      } : {
        c: common_vendor.t(selectedAddress.value.region),
        d: common_vendor.t(selectedAddress.value.detail),
        e: common_vendor.t(selectedAddress.value.name),
        f: common_vendor.t(selectedAddress.value.phone)
      }, {
        g: common_vendor.p({
          name: "arrow-right",
          color: "#999",
          size: "18"
        }),
        h: common_vendor.o(selectAddress),
        i: common_vendor.f(orderItems.value, (item, k0, i0) => {
          return {
            a: item.productDetails.coverImage,
            b: common_vendor.t(item.productDetails.name),
            c: common_vendor.t(item.quantity),
            d: common_vendor.t(item.productDetails.price),
            e: item.productId
          };
        }),
        j: common_vendor.t(totalPrice.value.toFixed(2)),
        k: common_vendor.t(totalPrice.value.toFixed(2)),
        l: common_vendor.o(submitOrder),
        m: common_vendor.p({
          type: "primary",
          customStyle: submitBtnStyle.value,
          text: "提交订单"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e3ae1cb9"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order_confirm/order_confirm.js.map
