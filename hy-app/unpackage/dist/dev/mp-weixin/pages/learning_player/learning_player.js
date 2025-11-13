"use strict";
const common_vendor = require("../../common/vendor.js");
const api_course = require("../../api/course.js");
if (!Array) {
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_divider2 = common_vendor.resolveComponent("u-divider");
  const _easycom_u_modal2 = common_vendor.resolveComponent("u-modal");
  (_easycom_u_loading_icon2 + _easycom_u_empty2 + _easycom_u_icon2 + _easycom_u_button2 + _easycom_u_divider2 + _easycom_u_modal2)();
}
const _easycom_u_loading_icon = () => "../../uni_modules/uview-plus/components/u-loading-icon/u-loading-icon.js";
const _easycom_u_empty = () => "../../uni_modules/uview-plus/components/u-empty/u-empty.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_divider = () => "../../uni_modules/uview-plus/components/u-divider/u-divider.js";
const _easycom_u_modal = () => "../../uni_modules/uview-plus/components/u-modal/u-modal.js";
if (!Math) {
  (_easycom_u_loading_icon + _easycom_u_empty + _easycom_u_icon + _easycom_u_button + _easycom_u_divider + _easycom_u_modal)();
}
const _sfc_main = {
  __name: "learning_player",
  setup(__props) {
    const course = common_vendor.ref(null);
    const isLoading = common_vendor.ref(true);
    const courseId = common_vendor.ref(null);
    const userInfo = common_vendor.ref(null);
    const progress = common_vendor.ref({ completedChapters: [] });
    const currentChapter = common_vendor.ref({});
    const showCongratsModal = common_vendor.ref(false);
    const completeBtnStyle = common_vendor.computed(() => ({
      background: "linear-gradient(to right, #008585, #74a892)",
      color: "#fff",
      marginTop: "40rpx",
      border: "none"
    }));
    const isChapterCompleted = (chapterId) => {
      return progress.value.completedChapters.includes(chapterId);
    };
    const switchChapter = (chapter) => {
      currentChapter.value = chapter;
    };
    const viewCertificate = () => {
      showCongratsModal.value = false;
      common_vendor.index.navigateTo({
        url: `/pages/certificate/certificate?courseId=${courseId.value}`
      });
    };
    const markAsCompleted = async () => {
      if (isChapterCompleted(currentChapter.value.id)) {
        return common_vendor.index.showToast({ title: "本章已学习过", icon: "none" });
      }
      try {
        const res = await api_course.updateCourseProgressApi({
          userId: userInfo.value.id,
          courseId: courseId.value,
          chapterId: currentChapter.value.id
        });
        progress.value = res.progress;
        common_vendor.index.showToast({ title: "学习进度已保存", icon: "success" });
        if (res.justCompleted) {
          setTimeout(() => {
            showCongratsModal.value = true;
          }, 500);
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/learning_player/learning_player.vue:121", "进度保存失败:", error);
      }
    };
    common_vendor.onLoad(async (options) => {
      var _a;
      courseId.value = parseInt(options.id);
      userInfo.value = common_vendor.index.getStorageSync("user_info");
      if (!((_a = userInfo.value) == null ? void 0 : _a.id)) {
        common_vendor.index.showModal({
          title: "提示",
          content: "请先登录再开始学习",
          showCancel: false,
          success: () => common_vendor.index.switchTab({ url: "/pages/profile/profile" })
        });
        return;
      }
      isLoading.value = true;
      try {
        const [courseRes, progressRes] = await Promise.all([
          api_course.getCourseDetailApi(courseId.value),
          api_course.getCourseProgressApi({ userId: userInfo.value.id, courseId: courseId.value })
        ]);
        course.value = courseRes.course;
        progress.value = progressRes.progress || { completedChapters: [] };
        if (course.value) {
          common_vendor.index.setNavigationBarTitle({ title: course.value.title });
          const firstUncompleted = course.value.outline.find((chap) => !isChapterCompleted(chap.id));
          currentChapter.value = firstUncompleted || course.value.outline[0];
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/learning_player/learning_player.vue:157", "加载学习数据失败:", error);
        course.value = null;
      } finally {
        isLoading.value = false;
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
      } : !course.value ? {
        d: common_vendor.p({
          mode: "data",
          text: "课程信息加载失败"
        })
      } : {
        e: common_vendor.p({
          name: "play-right-fill",
          size: "50",
          color: "rgba(255,255,255,0.5)"
        }),
        f: common_vendor.t(currentChapter.value.title),
        g: common_vendor.t(currentChapter.value.content),
        h: common_vendor.o(markAsCompleted),
        i: common_vendor.p({
          type: "primary",
          customStyle: completeBtnStyle.value,
          text: "我已学会本章"
        }),
        j: common_vendor.p({
          text: "课程目录"
        }),
        k: common_vendor.f(course.value.outline, (chapter, k0, i0) => {
          return common_vendor.e({
            a: isChapterCompleted(chapter.id)
          }, isChapterCompleted(chapter.id) ? {
            b: "84f31d1f-5-" + i0,
            c: common_vendor.p({
              name: "checkmark-circle-fill",
              color: "#008585",
              size: "20"
            })
          } : {
            d: "84f31d1f-6-" + i0,
            e: common_vendor.p({
              name: "play-circle",
              color: "#999",
              size: "20"
            })
          }, {
            f: common_vendor.t(chapter.title),
            g: chapter.id,
            h: currentChapter.value.id === chapter.id ? 1 : "",
            i: common_vendor.o(($event) => switchChapter(chapter), chapter.id)
          });
        }),
        l: common_vendor.o(viewCertificate),
        m: common_vendor.o(($event) => showCongratsModal.value = false),
        n: common_vendor.p({
          show: showCongratsModal.value,
          title: "恭喜！",
          content: "您已完成本课程的全部学习，获得结业证书！",
          confirmText: "查看证书",
          cancelText: "稍后查看",
          showCancelButton: true
        })
      }, {
        c: !course.value
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-84f31d1f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/learning_player/learning_player.js.map
