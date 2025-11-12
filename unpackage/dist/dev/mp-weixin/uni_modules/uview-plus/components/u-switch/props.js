"use strict";
const uni_modules_uviewPlus_libs_vue = require("../../libs/vue.js");
const uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = uni_modules_uviewPlus_libs_vue.defineMixin({
  props: {
    // 是否为加载中状态
    loading: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.switch.loading
    },
    // 是否为禁用装填
    disabled: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.switch.disabled
    },
    // 开关尺寸，单位px
    size: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.props.switch.size
    },
    // 打开时的背景颜色
    activeColor: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.switch.activeColor
    },
    // 关闭时的背景颜色
    inactiveColor: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.switch.inactiveColor
    },
    // 通过v-model双向绑定的值
    modelValue: {
      type: [Boolean, String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.props.switch.value
    },
    // switch打开时的值
    activeValue: {
      type: [String, Number, Boolean],
      default: () => uni_modules_uviewPlus_libs_config_props.props.switch.activeValue
    },
    // switch关闭时的值
    inactiveValue: {
      type: [String, Number, Boolean],
      default: () => uni_modules_uviewPlus_libs_config_props.props.switch.inactiveValue
    },
    // 是否开启异步变更，开启后需要手动控制输入值
    asyncChange: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.switch.asyncChange
    },
    // 圆点与外边框的距离
    space: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.props.switch.space
    }
  }
});
exports.props = props;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-switch/props.js.map
