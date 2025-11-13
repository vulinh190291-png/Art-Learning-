"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_course = require("../../api/course.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  _easycom_u_button2();
}
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  _easycom_u_button();
}
const _sfc_main = {
  __name: "certificate",
  setup(__props) {
    const userInfo = common_vendor.ref({});
    const course = common_vendor.ref({});
    const progress = common_vendor.ref({});
    const awardDate = common_vendor.computed(() => {
      if (!progress.value.awardDate)
        return "YYYY年MM月DD日";
      const date = new Date(progress.value.awardDate);
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    });
    const issueDate = common_vendor.computed(() => awardDate.value);
    const shareBtnStyle = common_vendor.computed(() => ({
      background: "linear-gradient(to right, #008585, #74a892)",
      color: "#fff",
      border: "none"
    }));
    common_vendor.onLoad(async (options) => {
      const courseId = options.courseId;
      userInfo.value = common_vendor.index.getStorageSync("user_info") || {};
      if (!courseId || !userInfo.value.id) {
        return;
      }
      try {
        const [courseRes, progressRes] = await Promise.all([
          api_course.getCourseDetailApi(courseId),
          api_course.getCourseProgressApi({ userId: userInfo.value.id, courseId })
        ]);
        course.value = courseRes.course || {};
        progress.value = progressRes.progress || {};
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/certificate/certificate.vue:73", "加载证书数据失败:", error);
        course.value = { title: "未知课程" };
        progress.value = {};
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.t(userInfo.value.nickname || "同学"),
        c: common_vendor.t(awardDate.value),
        d: common_vendor.t(course.value.title || "课程"),
        e: common_vendor.t(issueDate.value),
        f: common_vendor.p({
          type: "primary",
          customStyle: shareBtnStyle.value,
          text: "分享我的证书"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ff9f7cff"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/certificate/certificate.js.map
