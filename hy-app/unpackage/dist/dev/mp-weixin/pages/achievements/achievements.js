"use strict";
const common_vendor = require("../../common/vendor.js");
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
  __name: "achievements",
  setup(__props) {
    const achievementList = common_vendor.ref([]);
    const isLoading = common_vendor.ref(true);
    const userInfo = common_vendor.ref(null);
    const fetchAchievements = async () => {
      isLoading.value = true;
      try {
        const res = await common_vendor.index.request({ url: `http://localhost:3000/api/achievements?userId=${userInfo.value.id}` });
        if (res.data.success) {
          achievementList.value = res.data.achievements;
        } else {
          achievementList.value = [];
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/achievements/achievements.vue:53", "Failed to fetch achievements:", error);
        achievementList.value = [];
      } finally {
        isLoading.value = false;
      }
    };
    common_vendor.onShow(() => {
      userInfo.value = common_vendor.index.getStorageSync("user_info");
      if (!userInfo.value) {
        common_vendor.index.showModal({
          title: "提示",
          content: "请先登录查看成就",
          showCancel: false,
          success: () => common_vendor.index.switchTab({ url: "/pages/profile/profile" })
        });
      } else {
        fetchAchievements();
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
      } : achievementList.value.length === 0 ? {
        d: common_vendor.p({
          mode: "history",
          icon: "/static/logo.png",
          text: "您还没有获得任何成就，快去探索吧！"
        })
      } : {
        e: common_vendor.f(achievementList.value, (badge, k0, i0) => {
          return common_vendor.e({
            a: badge.icon,
            b: common_vendor.t(badge.name),
            c: common_vendor.t(badge.description),
            d: !badge.isEarned
          }, !badge.isEarned ? {
            e: "062a4f72-2-" + i0,
            f: common_vendor.p({
              name: "lock-fill",
              color: "#fff",
              size: "30"
            })
          } : {}, {
            g: badge.badgeId,
            h: badge.isEarned ? 1 : ""
          });
        })
      }, {
        c: achievementList.value.length === 0
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-062a4f72"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/achievements/achievements.js.map
