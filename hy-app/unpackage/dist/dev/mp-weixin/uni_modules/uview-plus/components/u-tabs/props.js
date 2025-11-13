"use strict";
const uni_modules_uviewPlus_libs_vue = require("../../libs/vue.js");
const uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = uni_modules_uviewPlus_libs_vue.defineMixin({
  props: {
    // 滑块的移动过渡时间，单位ms
    duration: {
      type: Number,
      default: () => uni_modules_uviewPlus_libs_config_props.props.tabs.duration
    },
    // tabs标签数组
    list: {
      type: Array,
      default: () => uni_modules_uviewPlus_libs_config_props.props.tabs.list
    },
    // 滑块颜色
    lineColor: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.tabs.lineColor
    },
    // 菜单选择中时的样式
    activeStyle: {
      type: [String, Object],
      default: () => uni_modules_uviewPlus_libs_config_props.props.tabs.activeStyle
    },
    // 菜单非选中时的样式
    inactiveStyle: {
      type: [String, Object],
      default: () => uni_modules_uviewPlus_libs_config_props.props.tabs.inactiveStyle
    },
    // 滑块长度
    lineWidth: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.props.tabs.lineWidth
    },
    // 滑块高度
    lineHeight: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.props.tabs.lineHeight
    },
    // 滑块背景显示大小，当滑块背景设置为图片时使用
    lineBgSize: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.tabs.lineBgSize
    },
    // 菜单item的样式
    itemStyle: {
      type: [String, Object],
      default: () => uni_modules_uviewPlus_libs_config_props.props.tabs.itemStyle
    },
    // 菜单是否可滚动
    scrollable: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.tabs.scrollable
    },
    // 当前选中标签的索引
    current: {
      type: [Number, String],
      default: () => uni_modules_uviewPlus_libs_config_props.props.tabs.current
    },
    // 默认读取的键名
    keyName: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.tabs.keyName
    },
    // 左侧图标样式
    iconStyle: {
      type: [String, Object],
      default: () => uni_modules_uviewPlus_libs_config_props.props.tabs.iconStyle
    }
  }
});
exports.props = props;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-tabs/props.js.map
