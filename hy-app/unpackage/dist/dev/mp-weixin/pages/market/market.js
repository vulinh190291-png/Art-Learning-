"use strict";
const common_vendor = require("../../common/vendor.js");
const api_market = require("../../api/market.js");
if (!Array) {
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  (_easycom_u_search2 + _easycom_u_loading_icon2 + _easycom_u_empty2 + _easycom_u_icon2)();
}
const _easycom_u_search = () => "../../uni_modules/uview-plus/components/u-search/u-search.js";
const _easycom_u_loading_icon = () => "../../uni_modules/uview-plus/components/u-loading-icon/u-loading-icon.js";
const _easycom_u_empty = () => "../../uni_modules/uview-plus/components/u-empty/u-empty.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_search + _easycom_u_loading_icon + _easycom_u_empty + _easycom_u_icon)();
}
const _sfc_main = {
  __name: "market",
  setup(__props) {
    const products = common_vendor.ref([]);
    const isLoading = common_vendor.ref(true);
    const keyword = common_vendor.ref("");
    const filter = common_vendor.reactive({ sellerId: null, sellerName: "" });
    const filteredProducts = common_vendor.computed(() => {
      let result = products.value;
      if (filter.sellerId) {
        result = result.filter((p) => p.sellerId === filter.sellerId);
      }
      if (keyword.value) {
        const searchKeyword = keyword.value.trim().toLowerCase();
        result = result.filter(
          (item) => item.name.toLowerCase().includes(searchKeyword)
        );
      }
      return result;
    });
    const fetchProducts = async () => {
      isLoading.value = true;
      try {
        const res = await api_market.getProductsApi();
        products.value = res.products || [];
      } catch (error) {
        products.value = [];
        common_vendor.index.__f__("error", "at pages/market/market.vue:107", "获取商品列表失败:", error);
      } finally {
        isLoading.value = false;
        common_vendor.index.stopPullDownRefresh();
      }
    };
    const clearFilter = () => {
      filter.sellerId = null;
      filter.sellerName = "";
      keyword.value = "";
    };
    const goToProductDetail = (product) => {
      common_vendor.index.navigateTo({ url: `/pages/product_detail/product_detail?id=${product.id}` });
    };
    common_vendor.onShow(() => {
      const storeFilter = common_vendor.index.getStorageSync("store_filter");
      if (storeFilter && storeFilter.sellerId) {
        filter.sellerId = storeFilter.sellerId;
        filter.sellerName = storeFilter.sellerName;
        common_vendor.index.removeStorageSync("store_filter");
      }
      fetchProducts();
    });
    common_vendor.onPullDownRefresh(() => {
      clearFilter();
      fetchProducts();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => keyword.value = $event),
        b: common_vendor.p({
          placeholder: "搜索感兴趣的宝贝",
          showAction: false,
          bgColor: "#ffffff",
          shape: "round",
          height: "70rpx",
          modelValue: keyword.value
        }),
        c: filter.sellerName
      }, filter.sellerName ? {
        d: common_vendor.t(filter.sellerName),
        e: common_vendor.o(clearFilter)
      } : {}, {
        f: isLoading.value
      }, isLoading.value ? {
        g: common_vendor.p({
          mode: "circle",
          size: "30"
        })
      } : products.value.length === 0 ? {
        i: common_vendor.p({
          mode: "car",
          text: "集市里还没有商品"
        })
      } : filteredProducts.value.length === 0 ? {
        k: common_vendor.p({
          mode: "search",
          text: filter.sellerId ? "该店铺暂无商品" : "没有找到相关的宝贝"
        })
      } : {
        l: common_vendor.f(filteredProducts.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.coverImage,
            b: item.isCertified
          }, item.isCertified ? {
            c: "8b43de22-4-" + i0,
            d: common_vendor.p({
              name: "level",
              color: "#fff",
              size: "12"
            })
          } : {}, {
            e: common_vendor.t(item.name),
            f: common_vendor.t(item.price),
            g: item.sellerAvatar,
            h: common_vendor.t(item.sellerName),
            i: item.id,
            j: common_vendor.o(($event) => goToProductDetail(item), item.id)
          });
        })
      }, {
        h: products.value.length === 0,
        j: filteredProducts.value.length === 0
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8b43de22"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/market/market.js.map
