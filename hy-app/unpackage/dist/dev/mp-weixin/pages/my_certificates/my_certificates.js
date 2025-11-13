"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_course = require("../../api/course.js");
if (!Array) {
  const _easycom_u_navbar2 = common_vendor.resolveComponent("u-navbar");
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  (_easycom_u_navbar2 + _easycom_u_loading_icon2 + _easycom_u_empty2)();
}
const _easycom_u_navbar = () => "../../uni_modules/uview-plus/components/u-navbar/u-navbar.js";
const _easycom_u_loading_icon = () => "../../uni_modules/uview-plus/components/u-loading-icon/u-loading-icon.js";
const _easycom_u_empty = () => "../../uni_modules/uview-plus/components/u-empty/u-empty.js";
if (!Math) {
  (_easycom_u_navbar + _easycom_u_loading_icon + _easycom_u_empty)();
}
const _sfc_main = {
  __name: "my_certificates",
  setup(__props) {
    const isLoading = common_vendor.ref(true);
    const certificates = common_vendor.ref([]);
    const userInfo = common_vendor.ref(null);
    const fetchCertificates = async () => {
      var _a;
      if (!((_a = userInfo.value) == null ? void 0 : _a.id)) {
        isLoading.value = false;
        return;
      }
      isLoading.value = true;
      try {
        const res = await api_course.getCertificatesApi({ userId: userInfo.value.id });
        certificates.value = res.certificates || [];
      } catch (error) {
        certificates.value = [];
        common_vendor.index.__f__("error", "at pages/my_certificates/my_certificates.vue:56", "获取证书列表失败:", error);
      } finally {
        isLoading.value = false;
      }
    };
    const formatDate = (dateString) => {
      if (!dateString)
        return "未知日期";
      return common_vendor.dayjs(dateString).format("YYYY年MM月DD日");
    };
    const viewCertificate = (courseId) => {
      common_vendor.index.navigateTo({
        url: `/pages/certificate/certificate?courseId=${courseId}`
      });
    };
    common_vendor.onShow(() => {
      userInfo.value = common_vendor.index.getStorageSync("user_info");
      if (userInfo.value) {
        fetchCertificates();
      } else {
        isLoading.value = false;
        certificates.value = [];
        common_vendor.index.showModal({
          title: "提示",
          content: "请先登录查看证书",
          showCancel: false,
          success: () => common_vendor.index.switchTab({ url: "/pages/profile/profile" })
        });
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "我的证书",
          autoBack: true,
          placeholder: true
        }),
        b: isLoading.value
      }, isLoading.value ? {
        c: common_vendor.p({
          mode: "circle",
          size: "30"
        })
      } : certificates.value.length === 0 ? {
        e: common_vendor.p({
          mode: "data",
          text: "暂无已获得的证书",
          icon: "/static/logo.png"
        })
      } : {
        f: common_vendor.f(certificates.value, (cert, k0, i0) => {
          return {
            a: cert.coverImage,
            b: common_vendor.t(cert.title),
            c: common_vendor.t(cert.instructor),
            d: common_vendor.t(formatDate(cert.awardDate)),
            e: cert.courseId,
            f: common_vendor.o(($event) => viewCertificate(cert.courseId), cert.courseId)
          };
        }),
        g: common_assets._imports_0$1
      }, {
        d: certificates.value.length === 0
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-58efd5a7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my_certificates/my_certificates.js.map
