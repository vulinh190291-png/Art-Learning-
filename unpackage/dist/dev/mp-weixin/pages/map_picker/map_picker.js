"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_loading_icon2 + _easycom_u_icon2 + _easycom_u_button2)();
}
const _easycom_u_loading_icon = () => "../../uni_modules/uview-plus/components/u-loading-icon/u-loading-icon.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_loading_icon + _easycom_u_icon + _easycom_u_button)();
}
const _sfc_main = {
  __name: "map_picker",
  setup(__props) {
    const longitude = common_vendor.ref(116.4074);
    const latitude = common_vendor.ref(39.9042);
    const mapCtx = common_vendor.ref(null);
    const panelLoading = common_vendor.ref(true);
    const regionChangeTimer = common_vendor.ref(null);
    const isMapReady = common_vendor.ref(false);
    const selectedAddress = common_vendor.reactive({
      title: "",
      address: "",
      province: "",
      city: "",
      district: ""
    });
    const confirmBtnStyle = {
      background: "linear-gradient(to right, #008585, #74a892)",
      color: "#fff",
      border: "none",
      height: "90rpx"
    };
    common_vendor.onLoad(() => {
      common_vendor.index.getLocation({
        type: "gcj02",
        success: (res) => {
          longitude.value = res.longitude;
          latitude.value = res.latitude;
        },
        fail: () => {
          common_vendor.index.showToast({ title: "定位失败，将使用默认位置", icon: "none" });
        },
        complete: () => {
          isMapReady.value = true;
          common_vendor.nextTick$1(() => {
            mapCtx.value = common_vendor.index.createMapContext("locationMap");
            getCenterLocationAndReverseGeocode();
          });
        }
      });
    });
    const onRegionChange = (e) => {
      if (e.type === "end" && (e.causedBy === "drag" || e.causedBy === "scale")) {
        panelLoading.value = true;
        if (regionChangeTimer.value) {
          clearTimeout(regionChangeTimer.value);
        }
        regionChangeTimer.value = setTimeout(() => {
          getCenterLocationAndReverseGeocode();
        }, 300);
      }
    };
    const getCenterLocationAndReverseGeocode = () => {
      if (!mapCtx.value)
        return;
      mapCtx.value.getCenterLocation({
        success: (res) => {
          reverseGeocode(res.latitude, res.longitude);
        },
        fail: () => {
          panelLoading.value = false;
          common_vendor.index.showToast({ title: "获取中心点失败", icon: "error" });
        }
      });
    };
    const reverseGeocode = (lat, lng) => {
      common_vendor.index.request({
        url: "http://localhost:3000/api/maps/reverse-geocode",
        data: { lat, lng },
        success: (res) => {
          if (res.data.status === 0) {
            const result = res.data.result;
            if (result.formatted_addresses) {
              selectedAddress.title = result.formatted_addresses.recommend || result.formatted_addresses.rough || result.address;
            } else {
              selectedAddress.title = result.address;
            }
            selectedAddress.address = result.address;
            selectedAddress.province = result.address_component.province;
            selectedAddress.city = result.address_component.city;
            selectedAddress.district = result.address_component.district;
          } else {
            selectedAddress.title = "无法解析当前位置";
            selectedAddress.address = `错误: ${res.data.message}`;
          }
        },
        fail: () => {
          selectedAddress.title = "网络错误";
          selectedAddress.address = "无法连接到本地后端服务";
        },
        complete: () => {
          panelLoading.value = false;
        }
      });
    };
    const confirmSelection = () => {
      const dataToEmit = {
        region: `${selectedAddress.province} ${selectedAddress.city} ${selectedAddress.district}`,
        detail: selectedAddress.address.replace(selectedAddress.province, "").replace(selectedAddress.city, "").replace(selectedAddress.district, "")
      };
      try {
        const eventChannel = common_vendor.index.getOpenerEventChannel();
        eventChannel.emit("acceptDataFromMap", dataToEmit);
      } catch (e) {
        common_vendor.index.setStorageSync("map_selected_address", dataToEmit);
      }
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isMapReady.value
      }, isMapReady.value ? {
        b: longitude.value,
        c: latitude.value,
        d: common_vendor.o(onRegionChange)
      } : {
        e: common_vendor.p({
          mode: "circle",
          text: "正在加载地图...",
          size: "26"
        })
      }, {
        f: isMapReady.value
      }, isMapReady.value ? common_vendor.e({
        g: common_vendor.p({
          name: "map-fill",
          color: "#c7522a",
          size: "34"
        }),
        h: panelLoading.value
      }, panelLoading.value ? {
        i: common_vendor.p({
          mode: "circle",
          text: "正在解析地址...",
          size: "16"
        })
      } : {
        j: common_vendor.t(selectedAddress.title),
        k: common_vendor.t(selectedAddress.address)
      }, {
        l: common_vendor.o(confirmSelection),
        m: common_vendor.p({
          type: "primary",
          text: "确认选择该位置",
          disabled: panelLoading.value || !selectedAddress.title,
          customStyle: confirmBtnStyle
        })
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5182b819"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/map_picker/map_picker.js.map
