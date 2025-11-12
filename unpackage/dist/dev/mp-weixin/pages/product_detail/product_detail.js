"use strict";
const common_vendor = require("../../common/vendor.js");
const api_market = require("../../api/market.js");
if (!Array) {
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  const _easycom_u_swiper2 = common_vendor.resolveComponent("u-swiper");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_divider2 = common_vendor.resolveComponent("u-divider");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_number_box2 = common_vendor.resolveComponent("u-number-box");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_loading_icon2 + _easycom_u_empty2 + _easycom_u_swiper2 + _easycom_u_button2 + _easycom_u_divider2 + _easycom_u_icon2 + _easycom_u_number_box2 + _easycom_u_popup2)();
}
const _easycom_u_loading_icon = () => "../../uni_modules/uview-plus/components/u-loading-icon/u-loading-icon.js";
const _easycom_u_empty = () => "../../uni_modules/uview-plus/components/u-empty/u-empty.js";
const _easycom_u_swiper = () => "../../uni_modules/uview-plus/components/u-swiper/u-swiper.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_divider = () => "../../uni_modules/uview-plus/components/u-divider/u-divider.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_number_box = () => "../../uni_modules/uview-plus/components/u-number-box/u-number-box.js";
const _easycom_u_popup = () => "../../uni_modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_loading_icon + _easycom_u_empty + _easycom_u_swiper + _easycom_u_button + _easycom_u_divider + _easycom_u_icon + _easycom_u_number_box + _easycom_u_popup)();
}
const _sfc_main = {
  __name: "product_detail",
  setup(__props) {
    const product = common_vendor.ref(null);
    const isLoading = common_vendor.ref(true);
    const productId = common_vendor.ref(null);
    const showBuyPopup = common_vendor.ref(false);
    const popupQuantity = common_vendor.ref(1);
    const swiperList = common_vendor.computed(() => {
      return product.value ? [product.value.coverImage] : [];
    });
    const cartBtnStyle = common_vendor.computed(() => ({
      backgroundColor: "#e5c185",
      color: "#004343",
      border: "none",
      width: "220rpx"
    }));
    const buyBtnStyle = common_vendor.computed(() => ({
      backgroundColor: "#c7522a",
      color: "#fff",
      border: "none"
    }));
    const fetchProductDetail = async () => {
      if (!productId.value)
        return;
      isLoading.value = true;
      try {
        const res = await api_market.getProductDetailApi(productId.value);
        product.value = res.product;
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/product_detail/product_detail.vue:114", "获取商品详情失败:", error);
        product.value = null;
      } finally {
        isLoading.value = false;
      }
    };
    const addToCart = async () => {
      const user = common_vendor.index.getStorageSync("user_info");
      if (!user) {
        return common_vendor.index.showModal({
          title: "提示",
          content: "请先登录",
          showCancel: false,
          success: () => common_vendor.index.switchTab({ url: "/pages/profile/profile" })
        });
      }
      try {
        await api_market.addToCartApi({
          userId: user.id,
          productId: productId.value,
          quantity: 1
          // 详情页默认添加1件
        });
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/product_detail/product_detail.vue:139", "添加购物车失败:", error);
      }
    };
    const buyNow = () => {
      const user = common_vendor.index.getStorageSync("user_info");
      if (!user) {
        return common_vendor.index.showModal({
          title: "提示",
          content: "请先登录",
          showCancel: false,
          success: () => common_vendor.index.switchTab({ url: "/pages/profile/profile" })
        });
      }
      showBuyPopup.value = true;
    };
    const confirmBuy = () => {
      const orderItems = [{
        productId: product.value.id,
        quantity: popupQuantity.value,
        productDetails: product.value
      }];
      common_vendor.index.setStorageSync("order_confirm_items", orderItems);
      showBuyPopup.value = false;
      common_vendor.index.navigateTo({ url: "/pages/order_confirm/order_confirm" });
    };
    const visitStore = () => {
      var _a;
      if (!((_a = product.value) == null ? void 0 : _a.sellerId))
        return;
      common_vendor.index.setStorageSync("store_filter", {
        sellerId: product.value.sellerId,
        sellerName: product.value.sellerName
      });
      common_vendor.index.switchTab({ url: "/pages/market/market" });
    };
    const goToCart = () => {
      common_vendor.index.navigateTo({ url: "/pages/cart/cart" });
    };
    common_vendor.onLoad((options) => {
      productId.value = options.id;
      fetchProductDetail();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isLoading.value
      }, isLoading.value ? {
        b: common_vendor.p({
          mode: "circle",
          size: "30"
        })
      } : !product.value ? {
        d: common_vendor.p({
          mode: "data",
          text: "商品信息加载失败"
        })
      } : {
        e: common_vendor.p({
          list: swiperList.value,
          height: "750rpx",
          indicator: true,
          indicatorMode: "dot",
          circular: true
        }),
        f: common_vendor.t(product.value.price),
        g: common_vendor.t(product.value.name),
        h: product.value.sellerAvatar,
        i: common_vendor.t(product.value.sellerName),
        j: common_vendor.o(visitStore),
        k: common_vendor.p({
          size: "small",
          shape: "circle",
          text: "进店逛逛"
        }),
        l: common_vendor.o(visitStore),
        m: common_vendor.p({
          text: "宝贝详情"
        }),
        n: common_vendor.t(product.value.description),
        o: common_vendor.p({
          name: "server-fill",
          label: "客服",
          size: "24",
          labelPos: "bottom",
          space: "4px"
        }),
        p: common_vendor.o(goToCart),
        q: common_vendor.p({
          name: "shopping-cart",
          label: "购物车",
          size: "24",
          labelPos: "bottom",
          space: "4px"
        }),
        r: common_vendor.o(addToCart),
        s: common_vendor.p({
          shape: "circle",
          customStyle: cartBtnStyle.value,
          text: "加入购物车"
        }),
        t: common_vendor.o(buyNow),
        v: common_vendor.p({
          shape: "circle",
          customStyle: buyBtnStyle.value,
          text: "立即购买"
        }),
        w: product.value.coverImage,
        x: common_vendor.t(product.value.price),
        y: common_vendor.t(product.value.stock),
        z: common_vendor.o(($event) => popupQuantity.value = $event),
        A: common_vendor.p({
          min: 1,
          max: product.value.stock,
          modelValue: popupQuantity.value
        }),
        B: common_vendor.o(confirmBuy),
        C: common_vendor.p({
          type: "primary",
          customStyle: buyBtnStyle.value,
          text: "确定"
        }),
        D: common_vendor.o(($event) => showBuyPopup.value = false),
        E: common_vendor.p({
          show: showBuyPopup.value,
          round: "10"
        })
      }, {
        c: !product.value
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0eb4e14b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/product_detail/product_detail.js.map
