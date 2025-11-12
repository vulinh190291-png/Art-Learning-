"use strict";
const common_vendor = require("../../common/vendor.js");
const api_address = require("../../api/address.js");
if (!Array) {
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  const _easycom_u_line2 = common_vendor.resolveComponent("u-line");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_loading_icon2 + _easycom_u_empty2 + _easycom_u_line2 + _easycom_u_icon2 + _easycom_u_button2)();
}
const _easycom_u_loading_icon = () => "../../uni_modules/uview-plus/components/u-loading-icon/u-loading-icon.js";
const _easycom_u_empty = () => "../../uni_modules/uview-plus/components/u-empty/u-empty.js";
const _easycom_u_line = () => "../../uni_modules/uview-plus/components/u-line/u-line.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_loading_icon + _easycom_u_empty + _easycom_u_line + _easycom_u_icon + _easycom_u_button)();
}
const _sfc_main = {
  __name: "address_management",
  setup(__props) {
    const addressList = common_vendor.ref([]);
    const userInfo = common_vendor.ref(null);
    const isLoading = common_vendor.ref(true);
    const isProcessing = common_vendor.ref(false);
    const pageSource = common_vendor.ref("");
    const addBtnStyle = { background: "linear-gradient(to right, #c7522a, #e5c185)", color: "#fff", border: "none", height: "90rpx" };
    common_vendor.onLoad((options) => {
      if (options.from) {
        pageSource.value = options.from;
      }
    });
    common_vendor.onShow(() => {
      userInfo.value = common_vendor.index.getStorageSync("user_info");
      fetchAddressList();
    });
    const fetchAddressList = async () => {
      var _a;
      if (!((_a = userInfo.value) == null ? void 0 : _a.id)) {
        isLoading.value = false;
        addressList.value = [];
        return;
      }
      isLoading.value = true;
      try {
        const res = await api_address.getAddressesApi({ userId: userInfo.value.id });
        addressList.value = res.addresses || [];
      } catch (error) {
        addressList.value = [];
        common_vendor.index.__f__("error", "at pages/address_management/address_management.vue:93", "获取地址列表失败:", error);
      } finally {
        isLoading.value = false;
      }
    };
    const deleteAddress = (address) => {
      if (isProcessing.value)
        return;
      common_vendor.index.showModal({
        title: "确认删除",
        content: "确定要删除这个地址吗？",
        success: async (res) => {
          if (res.confirm) {
            isProcessing.value = true;
            try {
              await api_address.deleteAddressApi(address.id, { userId: userInfo.value.id });
              await fetchAddressList();
            } catch (error) {
              common_vendor.index.__f__("error", "at pages/address_management/address_management.vue:112", "删除地址失败:", error);
            } finally {
              isProcessing.value = false;
            }
          }
        }
      });
    };
    const setDefault = async (address) => {
      if (isProcessing.value || address.isDefault)
        return;
      isProcessing.value = true;
      try {
        await api_address.setDefaultAddressApi(address.id, { userId: userInfo.value.id });
        await fetchAddressList();
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/address_management/address_management.vue:130", "设置默认地址失败:", error);
      } finally {
        isProcessing.value = false;
      }
    };
    const goToAddAddress = () => {
      common_vendor.index.navigateTo({ url: "/pages/address_edit/address_edit" });
    };
    const editAddress = (address) => {
      common_vendor.index.navigateTo({ url: `/pages/address_edit/address_edit?addressData=${encodeURIComponent(JSON.stringify(address))}` });
    };
    const selectAddressForOrder = (address) => {
      if (pageSource.value === "order_confirm") {
        common_vendor.index.setStorageSync("selected_address", address);
        common_vendor.index.navigateBack();
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isLoading.value
      }, isLoading.value ? {
        b: common_vendor.p({
          mode: "circle",
          size: "30"
        })
      } : {}, {
        c: !isLoading.value && addressList.value.length === 0
      }, !isLoading.value && addressList.value.length === 0 ? {
        d: common_vendor.p({
          mode: "address",
          text: "还没有收货地址，快添加一个吧"
        })
      } : {}, {
        e: common_vendor.f(addressList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.phone),
            c: common_vendor.t(item.region),
            d: common_vendor.t(item.detail),
            e: item.isDefault
          }, item.isDefault ? {} : {}, {
            f: common_vendor.o(($event) => selectAddressForOrder(item), item.id),
            g: "da66836f-2-" + i0,
            h: item.isDefault
          }, item.isDefault ? {
            i: "da66836f-3-" + i0,
            j: common_vendor.p({
              name: "checkmark",
              color: "#fff",
              size: "12"
            })
          } : {}, {
            k: common_vendor.o(($event) => setDefault(item), item.id),
            l: "da66836f-4-" + i0,
            m: common_vendor.o(($event) => editAddress(item), item.id),
            n: "da66836f-5-" + i0,
            o: common_vendor.o(($event) => deleteAddress(item), item.id),
            p: item.id
          });
        }),
        f: common_vendor.p({
          color: "#f5f5f5",
          margin: "0 30rpx"
        }),
        g: common_vendor.p({
          name: "edit-pen",
          color: "#666",
          size: "20"
        }),
        h: common_vendor.p({
          name: "trash",
          color: "#666",
          size: "20"
        }),
        i: !isLoading.value && addressList.value.length > 0,
        j: common_vendor.o(goToAddAddress),
        k: common_vendor.p({
          type: "primary",
          customStyle: addBtnStyle,
          text: "新增收货地址"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-da66836f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/address_management/address_management.js.map
