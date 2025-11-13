"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_u_cell2 = common_vendor.resolveComponent("u-cell");
  const _easycom_u_cell_group2 = common_vendor.resolveComponent("u-cell-group");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_cell2 + _easycom_u_cell_group2 + _easycom_u_button2)();
}
const _easycom_u_cell = () => "../../uni_modules/uview-plus/components/u-cell/u-cell.js";
const _easycom_u_cell_group = () => "../../uni_modules/uview-plus/components/u-cell-group/u-cell-group.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_cell + _easycom_u_cell_group + _easycom_u_button)();
}
const _sfc_main = {
  __name: "profile",
  setup(__props) {
    const isLoggedIn = common_vendor.ref(false);
    const userInfo = common_vendor.ref({});
    const loginBtnStyle = common_vendor.computed(() => ({
      background: "linear-gradient(to right, #008585, #004343)",
      color: "#fff",
      marginTop: "40rpx",
      width: "500rpx",
      height: "90rpx",
      borderRadius: "45rpx",
      border: "none"
    }));
    const checkLoginStatus = () => {
      const storedUser = common_vendor.index.getStorageSync("user_info");
      if (storedUser && storedUser.id) {
        userInfo.value = storedUser;
        if (!userInfo.value.avatar) {
          userInfo.value.avatar = "/static/logo.png";
        }
        isLoggedIn.value = true;
      } else {
        isLoggedIn.value = false;
        userInfo.value = {};
      }
    };
    const goToLogin = () => {
      common_vendor.index.navigateTo({ url: "/pages/login/login" });
    };
    const logout = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.removeStorageSync("user_info");
            checkLoginStatus();
            common_vendor.index.showToast({ title: "已退出登录", icon: "success" });
          }
        }
      });
    };
    common_vendor.onShow(() => {
      checkLoginStatus();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isLoggedIn.value
      }, isLoggedIn.value ? {
        b: userInfo.value.avatar,
        c: common_vendor.t(userInfo.value.nickname),
        d: common_vendor.t(userInfo.value.bio),
        e: common_vendor.p({
          title: "我的购物车",
          isLink: true,
          url: "/pages/cart/cart"
        }),
        f: common_vendor.p({
          title: "我的订单",
          isLink: true,
          url: "/pages/order_list/order_list"
        }),
        g: common_vendor.p({
          title: "我的收藏",
          isLink: true,
          url: "/pages/my_collections/my_collections"
        }),
        h: common_vendor.p({
          title: "编辑资料",
          isLink: true,
          url: "/pages/profile_edit/profile_edit"
        }),
        i: common_vendor.p({
          title: "我的成就",
          isLink: true,
          url: "/pages/achievements/achievements"
        }),
        j: common_vendor.p({
          title: "地址管理",
          isLink: true,
          url: "/pages/address_management/address_management"
        }),
        k: common_vendor.p({
          title: "我的证书",
          isLink: true,
          url: "/pages/my_certificates/my_certificates"
        }),
        l: common_vendor.p({
          border: false
        }),
        m: common_vendor.o(logout),
        n: common_vendor.p({
          text: "退出登录",
          type: "error",
          plain: true,
          customStyle: {
            borderRadius: "45rpx"
          }
        })
      } : {
        o: common_assets._imports_0,
        p: common_vendor.o(goToLogin),
        q: common_vendor.o(goToLogin),
        r: common_vendor.p({
          text: "登录 / 注册",
          size: "large",
          customStyle: loginBtnStyle.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dd383ca2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/profile.js.map
