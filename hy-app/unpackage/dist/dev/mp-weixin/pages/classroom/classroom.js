"use strict";
const common_vendor = require("../../common/vendor.js");
const api_course = require("../../api/course.js");
if (!Array) {
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  (_easycom_u_tabs2 + _easycom_u_loading_icon2 + _easycom_u_empty2 + _easycom_u_icon2)();
}
const _easycom_u_tabs = () => "../../uni_modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_u_loading_icon = () => "../../uni_modules/uview-plus/components/u-loading-icon/u-loading-icon.js";
const _easycom_u_empty = () => "../../uni_modules/uview-plus/components/u-empty/u-empty.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_tabs + _easycom_u_loading_icon + _easycom_u_empty + _easycom_u_icon)();
}
const _sfc_main = {
  __name: "classroom",
  setup(__props) {
    const courses = common_vendor.ref([]);
    const isLoading = common_vendor.ref(true);
    const tabList = common_vendor.ref([{ name: "全部" }, { name: "免费课程" }, { name: "付费课程" }]);
    const currentTab = common_vendor.ref(0);
    const filteredCourses = common_vendor.computed(() => {
      switch (currentTab.value) {
        case 1:
          return courses.value.filter((c) => c.type === "free");
        case 2:
          return courses.value.filter((c) => c.type === "paid");
        case 0:
        default:
          return courses.value;
      }
    });
    const onTabClick = (item) => {
      currentTab.value = item.index;
    };
    const goToCourseDetail = (course) => {
      common_vendor.index.navigateTo({
        url: `/pages/course_detail/course_detail?id=${course.id}`
      });
    };
    const fetchCourses = async () => {
      isLoading.value = true;
      try {
        const res = await api_course.getCoursesApi();
        courses.value = res.courses || [];
      } catch (error) {
        courses.value = [];
        common_vendor.index.__f__("error", "at pages/classroom/classroom.vue:86", "获取课程列表失败:", error);
      } finally {
        isLoading.value = false;
      }
    };
    common_vendor.onMounted(() => {
      fetchCourses();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(onTabClick),
        b: common_vendor.p({
          list: tabList.value,
          current: currentTab.value,
          activeStyle: {
            color: "#008585",
            fontWeight: "bold"
          }
        }),
        c: isLoading.value
      }, isLoading.value ? {
        d: common_vendor.p({
          mode: "circle",
          size: "30"
        })
      } : filteredCourses.value.length === 0 ? {
        f: common_vendor.p({
          mode: "list",
          text: "该分类下暂无课程"
        })
      } : {
        g: common_vendor.f(filteredCourses.value, (course, k0, i0) => {
          return {
            a: course.coverImage,
            b: common_vendor.t(course.title),
            c: "3026f528-3-" + i0,
            d: common_vendor.t(course.instructor),
            e: "3026f528-4-" + i0,
            f: common_vendor.t(course.studentCount),
            g: common_vendor.t(course.type === "free" ? "免费" : `¥ ${course.price}`),
            h: course.type === "free" ? 1 : "",
            i: course.id,
            j: common_vendor.o(($event) => goToCourseDetail(course), course.id)
          };
        }),
        h: common_vendor.p({
          name: "account",
          size: "16",
          color: "#999"
        }),
        i: common_vendor.p({
          name: "level",
          size: "16",
          color: "#999"
        })
      }, {
        e: filteredCourses.value.length === 0
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3026f528"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/classroom/classroom.js.map
