"use strict";
const common_vendor = require("../../common/vendor.js");
const api_course = require("../../api/course.js");
if (!Array) {
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_u_divider2 = common_vendor.resolveComponent("u-divider");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u__image2 = common_vendor.resolveComponent("u--image");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_loading_icon2 + _easycom_u_empty2 + _easycom_u_tabs2 + _easycom_u_divider2 + _easycom_u_icon2 + _easycom_u__image2 + _easycom_u_button2)();
}
const _easycom_u_loading_icon = () => "../../uni_modules/uview-plus/components/u-loading-icon/u-loading-icon.js";
const _easycom_u_empty = () => "../../uni_modules/uview-plus/components/u-empty/u-empty.js";
const _easycom_u_tabs = () => "../../uni_modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_u_divider = () => "../../uni_modules/uview-plus/components/u-divider/u-divider.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u__image = () => "../../uni_modules/uview-plus/components/u--image/u--image.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_loading_icon + _easycom_u_empty + _easycom_u_tabs + _easycom_u_divider + _easycom_u_icon + _easycom_u__image + _easycom_u_button)();
}
const _sfc_main = {
  __name: "course_detail",
  setup(__props) {
    const course = common_vendor.ref(null);
    const isLoading = common_vendor.ref(true);
    const courseId = common_vendor.ref(null);
    const tabList = common_vendor.ref([{ name: "课程详情" }, { name: "讲师介绍" }]);
    const currentTab = common_vendor.ref(0);
    const actionBtnStyle = common_vendor.computed(() => ({
      background: "linear-gradient(to right, #008585, #004343)",
      color: "#fff",
      height: "90rpx",
      borderRadius: "45rpx",
      border: "none"
    }));
    const onTabClick = (item) => {
      currentTab.value = item.index;
    };
    const startLearning = () => {
      common_vendor.index.navigateTo({
        url: `/pages/learning_player/learning_player?id=${courseId.value}`
      });
    };
    const fetchCourseDetail = async () => {
      if (!courseId.value)
        return;
      isLoading.value = true;
      try {
        const res = await api_course.getCourseDetailApi(courseId.value);
        course.value = res.course;
      } catch (error) {
        course.value = null;
        common_vendor.index.__f__("error", "at pages/course_detail/course_detail.vue:104", "获取课程详情失败:", error);
      } finally {
        isLoading.value = false;
      }
    };
    common_vendor.onLoad((options) => {
      courseId.value = options.id;
      fetchCourseDetail();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isLoading.value
      }, isLoading.value ? {
        b: common_vendor.p({
          mode: "circle",
          size: "30"
        })
      } : !course.value ? {
        d: common_vendor.p({
          mode: "data",
          text: "课程信息加载失败"
        })
      } : common_vendor.e({
        e: course.value.coverImage,
        f: common_vendor.t(course.value.title),
        g: common_vendor.t(course.value.instructor),
        h: common_vendor.t(course.value.type === "free" ? "免费" : `¥ ${course.value.price}`),
        i: course.value.type === "free" ? 1 : "",
        j: common_vendor.t(course.value.studentCount),
        k: common_vendor.o(onTabClick),
        l: common_vendor.p({
          list: tabList.value,
          current: currentTab.value,
          activeStyle: {
            color: "#008585",
            fontWeight: "bold"
          }
        }),
        m: currentTab.value === 0
      }, currentTab.value === 0 ? {
        n: common_vendor.t(course.value.description),
        o: common_vendor.p({
          text: "课程大纲"
        }),
        p: common_vendor.f(course.value.outline, (item, k0, i0) => {
          return {
            a: "530c69dc-4-" + i0,
            b: common_vendor.t(item.title),
            c: item.id
          };
        }),
        q: common_vendor.p({
          name: "file-text",
          size: "18",
          color: "#008585"
        })
      } : {}, {
        r: currentTab.value === 1
      }, currentTab.value === 1 ? {
        s: common_vendor.p({
          src: course.value.instructorInfo.avatar,
          width: "120rpx",
          height: "120rpx",
          shape: "circle"
        }),
        t: common_vendor.t(course.value.instructorInfo.name),
        v: common_vendor.t(course.value.instructorInfo.title),
        w: common_vendor.t(course.value.instructorInfo.bio)
      } : {}, {
        x: common_vendor.o(startLearning),
        y: common_vendor.p({
          type: "primary",
          customStyle: actionBtnStyle.value,
          text: "立即学习"
        })
      }), {
        c: !course.value
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-530c69dc"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/course_detail/course_detail.js.map
