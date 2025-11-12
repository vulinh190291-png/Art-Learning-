"use strict";
const common_vendor = require("../../common/vendor.js");
const api_market = require("../../api/market.js");
if (!Array) {
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_loading_icon2 + _easycom_u_empty2 + _easycom_u_button2)();
}
const _easycom_u_loading_icon = () => "../../uni_modules/uview-plus/components/u-loading-icon/u-loading-icon.js";
const _easycom_u_empty = () => "../../uni_modules/uview-plus/components/u-empty/u-empty.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_loading_icon + _easycom_u_empty + _easycom_u_button)();
}
const _sfc_main = {
  __name: "order_list",
  setup(__props) {
    const orderList = common_vendor.ref([]);
    const allProducts = common_vendor.ref({});
    const isLoading = common_vendor.ref(true);
    const userInfo = common_vendor.ref(null);
    const isProcessing = common_vendor.ref(false);
    const actionBtnStyle = { backgroundColor: "#008585", color: "#fff", margin: "0 0 0 16rpx", border: "none" };
    const actionBtnPlainStyle = { margin: "0 0 0 16rpx" };
    const fetchOrders = async () => {
      isLoading.value = true;
      try {
        const [orderRes, productRes] = await Promise.all([
          api_market.getOrdersApi({ userId: userInfo.value.id }),
          api_market.getProductsApi()
        ]);
        orderList.value = orderRes.orders || [];
        if (productRes.products) {
          allProducts.value = productRes.products.reduce((map, product) => {
            map[product.id] = product;
            return map;
          }, {});
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/order_list/order_list.vue:92", "获取订单列表失败:", error);
      } finally {
        isLoading.value = false;
      }
    };
    const cancelOrder = (order) => {
      if (isProcessing.value)
        return;
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要取消这个订单吗？",
        success: async (res) => {
          if (res.confirm) {
            isProcessing.value = true;
            try {
              order.status = "已取消";
              await api_market.updateOrderStatusApi(order.orderId, { status: "已取消" });
            } catch (error) {
              fetchOrders();
              common_vendor.index.__f__("error", "at pages/order_list/order_list.vue:116", "取消订单失败:", error);
            } finally {
              isProcessing.value = false;
            }
          }
        }
      });
    };
    const deleteOrderRecord = (order, index) => {
      if (isProcessing.value)
        return;
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要删除这条订单记录吗？此操作无法恢复。",
        success: async (res) => {
          if (res.confirm) {
            isProcessing.value = true;
            try {
              orderList.value.splice(index, 1);
              await api_market.deleteOrderApi(order.orderId);
            } catch (error) {
              fetchOrders();
              common_vendor.index.__f__("error", "at pages/order_list/order_list.vue:142", "删除订单失败:", error);
            } finally {
              isProcessing.value = false;
            }
          }
        }
      });
    };
    const getProductImage = (productId) => {
      const product = allProducts.value[productId];
      return product ? product.coverImage : "/static/logo.png";
    };
    const getStatusColor = (status) => {
      switch (status) {
        case "待付款":
          return "#c7522a";
        case "已完成":
          return "#008585";
        case "已取消":
          return "#999999";
        default:
          return "#333333";
      }
    };
    const viewOrderDetail = (order) => {
      common_vendor.index.navigateTo({
        url: `/pages/order_detail/order_detail?orderId=${order.orderId}`
      });
    };
    common_vendor.onShow(() => {
      userInfo.value = common_vendor.index.getStorageSync("user_info");
      if (userInfo.value) {
        fetchOrders();
      } else {
        isLoading.value = false;
        orderList.value = [];
        common_vendor.index.showModal({
          title: "提示",
          content: "请先登录",
          showCancel: false,
          success: () => common_vendor.index.switchTab({ url: "/pages/profile/profile" })
        });
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
        c: !isLoading.value && orderList.value.length === 0
      }, !isLoading.value && orderList.value.length === 0 ? {
        d: common_vendor.p({
          mode: "order",
          text: "您还没有任何订单"
        })
      } : {}, {
        e: common_vendor.f(orderList.value, (order, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(order.orderId),
            b: common_vendor.t(order.status),
            c: getStatusColor(order.status),
            d: common_vendor.o(($event) => viewOrderDetail(order), order.orderId),
            e: common_vendor.f(order.items, (item, k1, i1) => {
              return {
                a: getProductImage(item.productId),
                b: item.productId
              };
            }),
            f: common_vendor.o(($event) => viewOrderDetail(order), order.orderId),
            g: common_vendor.t(order.totalPrice.toFixed(2)),
            h: order.status === "已完成" || order.status === "已取消"
          }, order.status === "已完成" || order.status === "已取消" ? {
            i: common_vendor.o(($event) => deleteOrderRecord(order, index), order.orderId),
            j: "16b96b71-2-" + i0,
            k: common_vendor.p({
              shape: "circle",
              size: "small",
              text: "删除记录",
              customStyle: actionBtnPlainStyle
            })
          } : {}, {
            l: order.status === "待付款"
          }, order.status === "待付款" ? {
            m: common_vendor.o(($event) => cancelOrder(order), order.orderId),
            n: "16b96b71-3-" + i0,
            o: common_vendor.p({
              shape: "circle",
              size: "small",
              text: "取消订单",
              customStyle: actionBtnPlainStyle
            })
          } : {}, {
            p: common_vendor.o(($event) => viewOrderDetail(order), order.orderId),
            q: "16b96b71-4-" + i0,
            r: order.orderId
          });
        }),
        f: common_vendor.p({
          shape: "circle",
          size: "small",
          text: "查看详情",
          customStyle: actionBtnStyle
        }),
        g: !isLoading.value && orderList.value.length > 0
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-16b96b71"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order_list/order_list.js.map
