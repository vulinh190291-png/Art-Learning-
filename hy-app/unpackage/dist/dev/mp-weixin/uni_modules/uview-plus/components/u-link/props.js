"use strict";
const uni_modules_uviewPlus_libs_vue = require("../../libs/vue.js");
const uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = uni_modules_uviewPlus_libs_vue.defineMixin({
  props: {
    // 文字颜色
    color: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.link.color
    },
    // 字体大小，单位px
    fontSize: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.props.link.fontSize
    },
    // 是否显示下划线
    underLine: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.link.underLine
    },
    // 要跳转的链接
    href: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.link.href
    },
    // 小程序中复制到粘贴板的提示语
    mpTips: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.link.mpTips
    },
    // 下划线颜色
    lineColor: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.link.lineColor
    },
    // 超链接的问题，不使用slot形式传入，是因为nvue下无法修改颜色
    text: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.link.text
    }
  }
});
exports.props = props;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-link/props.js.map
