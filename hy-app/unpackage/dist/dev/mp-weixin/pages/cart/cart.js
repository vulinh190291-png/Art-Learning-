"use strict";
const common_vendor = require("../../common/vendor.js");
const api_market = require("../../api/market.js");
if (!Array) {
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  const _easycom_u_number_box2 = common_vendor.resolveComponent("u-number-box");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_loading_icon2 + _easycom_u_empty2 + _easycom_u_number_box2 + _easycom_u_icon2 + _easycom_u_button2)();
}
const _easycom_u_loading_icon = () => "../../uni_modules/uview-plus/components/u-loading-icon/u-loading-icon.js";
const _easycom_u_empty = () => "../../uni_modules/uview-plus/components/u-empty/u-empty.js";
const _easycom_u_number_box = () => "../../uni_modules/uview-plus/components/u-number-box/u-number-box.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_loading_icon + _easycom_u_empty + _easycom_u_number_box + _easycom_u_icon + _easycom_u_button)();
}
const _sfc_main = {
  __name: "cart",
  setup(__props) {
    const cart = common_vendor.ref({ items: [] });
    const isLoading = common_vendor.ref(true);
    const userInfo = common_vendor.ref(null);
    const checkoutBtnStyle = common_vendor.computed(() => ({
      background: "linear-gradient(to right, #c7522a, #e5c185)",
      color: "#fff",
      border: "none"
    }));
    const totalPrice = common_vendor.computed(() => {
      if (!cart.value || !cart.value.items)
        return "0.00";
      return cart.value.items.reduce((sum, item) => {
        if (item.productDetails) {
          return sum + item.productDetails.price * item.quantity;
        }
        return sum;
      }, 0).toFixed(2);
    });
    const fetchCart = async () => {
      isLoading.value = true;
      try {
        const res = await api_market.getCartApi({ userId: userInfo.value.id });
        cart.value = res.cart || { items: [] };
      } catch (error) {
        cart.value = { items: [] };
        common_vendor.index.__f__("error", "at pages/cart/cart.vue:91", "获取购物车失败:", error);
      } finally {
        isLoading.value = false;
      }
    };
    const onQuantityChange = async (e, productId) => {
      try {
        await api_market.updateCartApi({
          userId: userInfo.value.id,
          productId,
          quantity: e.value
        });
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/cart/cart.vue:105", "更新购物车数量失败:", error);
      }
    };
    const removeItem = (productId) => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要从购物车移除该商品吗？",
        success: async (res) => {
          if (res.confirm) {
            try {
              await api_market.removeFromCartApi({
                userId: userInfo.value.id,
                productId
              });
              fetchCart();
            } catch (error) {
              common_vendor.index.__f__("error", "at pages/cart/cart.vue:122", "移除商品失败:", error);
            }
          }
        }
      });
    };
    const goToConfirmOrder = () => {
      const validItems = cart.value.items.filter((item) => item.productDetails);
      if (validItems.length === 0) {
        common_vendor.index.showToast({ title: "购物车没有有效商品", icon: "none" });
        return;
      }
      common_vendor.index.setStorageSync("order_confirm_items", validItems);
      common_vendor.index.navigateTo({ url: "/pages/order_confirm/order_confirm" });
    };
    common_vendor.onShow(() => {
      userInfo.value = common_vendor.index.getStorageSync("user_info");
      if (!userInfo.value) {
        isLoading.value = false;
        cart.value = { items: [] };
        common_vendor.index.showModal({
          title: "提示",
          content: "请先登录",
          showCancel: false,
          success: () => common_vendor.index.switchTab({ url: "/pages/profile/profile" })
        });
      } else {
        fetchCart();
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isLoading.value
      }, isLoading.value ? {
        b: common_vendor.p({
          mode: "circle",
          size: "30"
        })
      } : {}, {
        c: !isLoading.value && (!cart.value || cart.value.items.length === 0)
      }, !isLoading.value && (!cart.value || cart.value.items.length === 0) ? {
        d: common_vendor.p({
          mode: "car",
          text: "购物车还是空的"
        })
      } : {}, {
        e: common_vendor.f(cart.value.items, (item, k0, i0) => {
          return common_vendor.e({
            a: item.productDetails
          }, item.productDetails ? {
            b: item.productDetails.coverImage,
            c: common_vendor.t(item.productDetails.name),
            d: common_vendor.t(item.productDetails.price),
            e: common_vendor.o(($event) => onQuantityChange($event, item.productId), item.productId),
            f: "c91e7611-2-" + i0,
            g: common_vendor.o(($event) => item.quantity = $event, item.productId),
            h: common_vendor.p({
              modelValue: item.quantity
            }),
            i: "c91e7611-3-" + i0,
            j: common_vendor.p({
              name: "trash",
              color: "#999",
              size: "20"
            }),
            k: common_vendor.o(($event) => removeItem(item.productId), item.productId)
          } : {
            l: common_vendor.o(($event) => removeItem(item.productId), item.productId)
          }, {
            m: item.productId
          });
        }),
        f: common_vendor.t(totalPrice.value),
        g: common_vendor.o(goToConfirmOrder),
        h: common_vendor.p({
          type: "primary",
          customStyle: checkoutBtnStyle.value,
          text: "去结算"
        }),
        i: !isLoading.value && cart.value && cart.value.items.length > 0
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c91e7611"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/cart/cart.js.map
