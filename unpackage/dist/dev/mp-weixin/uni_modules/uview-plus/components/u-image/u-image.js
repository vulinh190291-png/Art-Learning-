"use strict";
const uni_modules_uviewPlus_components_uImage_props = require("./props.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
const uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-image",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uImage_props.props],
  data() {
    return {
      // 图片是否加载错误，如果是，则显示错误占位图
      isError: false,
      // 初始化组件时，默认为加载中状态
      loading: true,
      // 不透明度，为了实现淡入淡出的效果
      opacity: 1,
      // 过渡时间，因为props的值无法修改，故需要一个中间值
      durationTime: this.duration,
      // 图片加载完成时，去掉背景颜色，因为如果是png图片，就会显示灰色的背景
      backgroundStyle: {},
      // 用于fade模式的控制组件显示与否
      show: false
    };
  },
  watch: {
    src: {
      immediate: true,
      handler(n) {
        if (!n) {
          this.isError = true;
        } else {
          this.isError = false;
          this.loading = true;
        }
      }
    }
  },
  computed: {
    transStyle() {
      let style = {};
      if (this.loading || this.isError || this.width == "100%" || this.mode != "heightFix") {
        style.width = uni_modules_uviewPlus_libs_function_index.addUnit(this.width);
      } else {
        style.width = "fit-content";
      }
      if (this.loading || this.isError || this.height == "100%" || this.mode != "widthFix") {
        style.height = uni_modules_uviewPlus_libs_function_index.addUnit(this.height);
      } else {
        style.height = "fit-content";
      }
      return style;
    },
    wrapStyle() {
      let style = {};
      if (this.loading || this.isError || this.width == "100%" || this.mode != "heightFix") {
        style.width = uni_modules_uviewPlus_libs_function_index.addUnit(this.width);
      } else {
        style.width = "fit-content";
      }
      if (this.loading || this.isError || this.height == "100%" || this.mode != "widthFix") {
        style.height = uni_modules_uviewPlus_libs_function_index.addUnit(this.height);
      } else {
        style.height = "fit-content";
      }
      style.borderRadius = this.shape == "circle" ? "10000px" : uni_modules_uviewPlus_libs_function_index.addUnit(this.radius);
      style.overflow = this.radius > 0 ? "hidden" : "visible";
      return uni_modules_uviewPlus_libs_function_index.deepMerge(style, uni_modules_uviewPlus_libs_function_index.addStyle(this.customStyle));
    }
  },
  mounted() {
    this.show = true;
  },
  emits: ["click", "error", "load"],
  methods: {
    addUnit: uni_modules_uviewPlus_libs_function_index.addUnit,
    // 点击图片
    onClick(e) {
      this.$emit("click", e);
    },
    // 图片加载失败
    onErrorHandler(err) {
      this.loading = false;
      this.isError = true;
      this.$emit("error", err);
    },
    // 图片加载完成，标记loading结束
    onLoadHandler(event) {
      this.loading = false;
      this.isError = false;
      this.$emit("load", event);
      this.removeBgColor();
    },
    // 移除图片的背景色
    removeBgColor() {
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_transition2 = common_vendor.resolveComponent("u-transition");
  (_easycom_u_icon2 + _easycom_u_transition2)();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
const _easycom_u_transition = () => "../u-transition/u-transition.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_transition)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.isError
  }, !$data.isError ? {
    b: _ctx.src,
    c: _ctx.mode,
    d: common_vendor.o((...args) => $options.onErrorHandler && $options.onErrorHandler(...args)),
    e: common_vendor.o((...args) => $options.onLoadHandler && $options.onLoadHandler(...args)),
    f: _ctx.showMenuByLongpress,
    g: _ctx.lazyLoad,
    h: $options.addUnit(_ctx.width),
    i: $options.addUnit(_ctx.height),
    j: _ctx.shape == "circle" ? "10000px" : $options.addUnit(_ctx.radius)
  } : {}, {
    k: _ctx.showLoading && $data.loading
  }, _ctx.showLoading && $data.loading ? {
    l: common_vendor.p({
      name: _ctx.loadingIcon
    }),
    m: _ctx.shape == "circle" ? "50%" : $options.addUnit(_ctx.radius),
    n: this.bgColor,
    o: $options.addUnit(_ctx.width),
    p: $options.addUnit(_ctx.height)
  } : {}, {
    q: _ctx.showError && $data.isError && !$data.loading
  }, _ctx.showError && $data.isError && !$data.loading ? {
    r: common_vendor.p({
      name: _ctx.errorIcon
    }),
    s: _ctx.shape == "circle" ? "50%" : $options.addUnit(_ctx.radius),
    t: this.bgColor,
    v: $options.addUnit(_ctx.width),
    w: $options.addUnit(_ctx.height)
  } : {}, {
    x: common_vendor.o((...args) => $options.onClick && $options.onClick(...args)),
    y: common_vendor.s($options.wrapStyle),
    z: common_vendor.s($data.backgroundStyle),
    A: common_vendor.s($options.transStyle),
    B: common_vendor.p({
      mode: "fade",
      show: $data.show,
      duration: _ctx.fade ? 1e3 : 0
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-abebd402"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-image/u-image.js.map
