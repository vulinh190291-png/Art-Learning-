"use strict";
const uni_modules_uviewPlus_components_uLoadmore_props = require("./props.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
const uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-loadmore",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uLoadmore_props.props],
  data() {
    return {
      // 粗点
      dotText: "●"
    };
  },
  computed: {
    // 加载的文字显示的样式
    loadTextStyle() {
      return {
        color: this.color,
        fontSize: uni_modules_uviewPlus_libs_function_index.addUnit(this.fontSize),
        lineHeight: uni_modules_uviewPlus_libs_function_index.addUnit(this.fontSize),
        backgroundColor: this.bgColor
      };
    },
    // 显示的提示文字
    showText() {
      let text = "";
      if (this.status == "loadmore")
        text = this.loadmoreText;
      else if (this.status == "loading")
        text = this.loadingText;
      else if (this.status == "nomore" && this.isDot)
        text = this.dotText;
      else
        text = this.nomoreText;
      return text;
    }
  },
  emits: ["loadmore"],
  methods: {
    addStyle: uni_modules_uviewPlus_libs_function_index.addStyle,
    addUnit: uni_modules_uviewPlus_libs_function_index.addUnit,
    loadMore() {
      if (this.status == "loadmore")
        this.$emit("loadmore");
    }
  }
};
if (!Array) {
  const _easycom_u_line2 = common_vendor.resolveComponent("u-line");
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  (_easycom_u_line2 + _easycom_u_loading_icon2)();
}
const _easycom_u_line = () => "../u-line/u-line.js";
const _easycom_u_loading_icon = () => "../u-loading-icon/u-loading-icon.js";
if (!Math) {
  (_easycom_u_line + _easycom_u_loading_icon)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.line
  }, _ctx.line ? {
    b: common_vendor.p({
      length: "140rpx",
      color: _ctx.lineColor,
      hairline: false,
      dashed: _ctx.dashed
    })
  } : {}, {
    c: _ctx.status === "loading" && _ctx.icon
  }, _ctx.status === "loading" && _ctx.icon ? {
    d: common_vendor.p({
      color: _ctx.iconColor,
      size: _ctx.iconSize,
      mode: _ctx.loadingIcon
    })
  } : {}, {
    e: common_vendor.t($options.showText),
    f: common_vendor.s($options.loadTextStyle),
    g: common_vendor.n(_ctx.status == "nomore" && _ctx.isDot == true ? "u-loadmore__content__dot-text" : "u-loadmore__content__text"),
    h: common_vendor.o((...args) => $options.loadMore && $options.loadMore(...args)),
    i: common_vendor.n(_ctx.status == "loadmore" || _ctx.status == "nomore" ? "u-more" : ""),
    j: _ctx.line
  }, _ctx.line ? {
    k: common_vendor.p({
      length: "140rpx",
      color: _ctx.lineColor,
      hairline: false,
      dashed: _ctx.dashed
    })
  } : {}, {
    l: common_vendor.s($options.addStyle(_ctx.customStyle)),
    m: common_vendor.s({
      backgroundColor: _ctx.bgColor,
      marginBottom: $options.addUnit(_ctx.marginBottom),
      marginTop: $options.addUnit(_ctx.marginTop),
      height: $options.addUnit(_ctx.height)
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4ccc1478"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-loadmore/u-loadmore.js.map
