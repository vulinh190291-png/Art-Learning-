"use strict";
const common_vendor = require("../../common/vendor.js");
const api_market = require("../../api/market.js");
if (!Array) {
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  (_easycom_u_loading_icon2 + _easycom_u_empty2 + _easycom_u_icon2)();
}
const _easycom_u_loading_icon = () => "../../uni_modules/uview-plus/components/u-loading-icon/u-loading-icon.js";
const _easycom_u_empty = () => "../../uni_modules/uview-plus/components/u-empty/u-empty.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_loading_icon + _easycom_u_empty + _easycom_u_icon)();
}
const _sfc_main = {
  __name: "order_detail",
  setup(__props) {
    const order = common_vendor.ref(null);
    const isLoading = common_vendor.ref(true);
    const allProducts = common_vendor.ref({});
    const fetchOrderDetail = async (orderId) => {
      isLoading.value = true;
      try {
        const [orderRes, productRes] = await Promise.all([
          api_market.getOrderDetailApi(orderId),
          api_market.getProductsApi()
        ]);
        order.value = orderRes.order;
        if (productRes.products) {
          allProducts.value = productRes.products.reduce((map, product) => {
            map[product.id] = product;
            return map;
          }, {});
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/order_detail/order_detail.vue:116", "获取订单详情失败:", error);
        order.value = null;
      } finally {
        isLoading.value = false;
      }
    };
    const getStatusColor = (status) => {
      switch (status) {
        case "待付款":
          return { bg: "linear-gradient(to right, #e5c185, #c7522a)" };
        case "已取消":
          return { bg: "#c0c4cc" };
        default:
          return { bg: "linear-gradient(to right, #74a892, #008585)" };
      }
    };
    const getStatusIcon = (status) => {
      switch (status) {
        case "待付款":
          return "more-dot-fill";
        case "已取消":
          return "close-circle-fill";
        default:
          return "checkmark-circle-fill";
      }
    };
    const getStatusText = (status) => {
      switch (status) {
        case "待付款":
          return { title: "等待买家付款", desc: "请在24小时内完成支付" };
        case "已取消":
          return { title: "交易已取消", desc: "订单已被关闭" };
        default:
          return { title: "交易成功", desc: "期待您的再次光临" };
      }
    };
    const getProductImage = (productId) => {
      const product = allProducts.value[productId];
      return product ? product.coverImage : "/static/logo.png";
    };
    const formatTimestamp = (ts) => common_vendor.dayjs(ts).format("YYYY-MM-DD HH:mm:ss");
    const copyToClipboard = (text) => {
      common_vendor.index.setClipboardData({
        data: text,
        success: () => common_vendor.index.showToast({ title: "已复制", icon: "success" })
      });
    };
    common_vendor.onLoad((options) => {
      if (options.orderId) {
        fetchOrderDetail(options.orderId);
      } else {
        isLoading.value = false;
        common_vendor.index.showToast({ title: "缺少订单ID", icon: "error" });
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
      } : !order.value ? {
        d: common_vendor.p({
          mode: "order",
          text: "订单信息不存在"
        })
      } : {
        e: common_vendor.p({
          name: getStatusIcon(order.value.status),
          color: "#fff",
          size: "34"
        }),
        f: common_vendor.t(getStatusText(order.value.status).title),
        g: common_vendor.t(getStatusText(order.value.status).desc),
        h: getStatusColor(order.value.status).bg,
        i: common_vendor.p({
          name: "map-fill",
          size: "20",
          color: "#999"
        }),
        j: common_vendor.t(order.value.shippingAddress.name),
        k: common_vendor.t(order.value.shippingAddress.phone),
        l: common_vendor.t(order.value.shippingAddress.region),
        m: common_vendor.t(order.value.shippingAddress.detail),
        n: common_vendor.f(order.value.items, (item, k0, i0) => {
          return {
            a: getProductImage(item.productId),
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.price),
            d: common_vendor.t(item.quantity),
            e: item.productId
          };
        }),
        o: common_vendor.t(order.value.orderId),
        p: common_vendor.p({
          name: "file-text",
          size: "16",
          color: "#999"
        }),
        q: common_vendor.o(($event) => copyToClipboard(order.value.orderId)),
        r: common_vendor.t(formatTimestamp(order.value.createdAt)),
        s: common_vendor.t(order.value.totalPrice.toFixed(2)),
        t: common_vendor.t(order.value.totalPrice.toFixed(2))
      }, {
        c: !order.value
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a1253e17"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order_detail/order_detail.js.map
