"use strict";
const uni_modules_uviewPlus_components_uSwiperIndicator_props = require("./props.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
const uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-swiper-indicator",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uSwiperIndicator_props.props],
  data() {
    return {
      lineWidth: 22
    };
  },
  computed: {
    // 指示器为线型的样式
    lineStyle() {
      let style = {};
      style.width = uni_modules_uviewPlus_libs_function_index.addUnit(this.lineWidth);
      style.transform = `translateX(${uni_modules_uviewPlus_libs_function_index.addUnit(this.current * this.lineWidth)})`;
      style.backgroundColor = this.indicatorActiveColor;
      return style;
    },
    // 指示器为点型的样式
    dotStyle() {
      return (index) => {
        let style = {};
        style.backgroundColor = index === this.current ? this.indicatorActiveColor : this.indicatorInactiveColor;
        return style;
      };
    }
  },
  methods: {
    addUnit: uni_modules_uviewPlus_libs_function_index.addUnit
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.indicatorMode === "line"
  }, _ctx.indicatorMode === "line" ? {
    b: common_vendor.s($options.lineStyle),
    c: common_vendor.n(`u-swiper-indicator__wrapper--${_ctx.indicatorMode}`),
    d: $options.addUnit($data.lineWidth * _ctx.length),
    e: _ctx.indicatorInactiveColor
  } : {}, {
    f: _ctx.indicatorMode === "dot"
  }, _ctx.indicatorMode === "dot" ? {
    g: common_vendor.f(_ctx.length, (item, index, i0) => {
      return {
        a: index,
        b: common_vendor.n(index === _ctx.current && "u-swiper-indicator__wrapper__dot--active"),
        c: common_vendor.s($options.dotStyle(index))
      };
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7b7c7ea6"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-swiper-indicator/u-swiper-indicator.js.map
