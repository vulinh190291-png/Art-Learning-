"use strict";
const uni_modules_uviewPlus_libs_vue = require("../../libs/vue.js");
const uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = uni_modules_uviewPlus_libs_vue.defineMixin({
  props: {
    // 当前展开面板的name，非手风琴模式：[<string | number>]，手风琴模式：string | number
    value: {
      type: [String, Number, Array, null],
      default: () => uni_modules_uviewPlus_libs_config_props.props.collapse.value
    },
    // 是否手风琴模式
    accordion: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.collapse.accordion
    },
    // 是否显示外边框
    border: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.collapse.border
    }
  }
});
exports.props = props;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-collapse/props.js.map
