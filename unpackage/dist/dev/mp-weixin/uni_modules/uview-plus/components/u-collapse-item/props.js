"use strict";
const uni_modules_uviewPlus_libs_vue = require("../../libs/vue.js");
const uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = uni_modules_uviewPlus_libs_vue.defineMixin({
  props: {
    // 标题
    title: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.collapseItem.title
    },
    // 标题的样式
    titleStyle: {
      type: [Object, String],
      default: () => {
        return uni_modules_uviewPlus_libs_config_props.props.collapseItem.titleStyle;
      }
    },
    // 标题右侧内容
    value: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.collapseItem.value
    },
    // 标题下方的描述信息
    label: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.collapseItem.label
    },
    // 是否禁用折叠面板
    disabled: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.collapseItem.disabled
    },
    // 是否展示右侧箭头并开启点击反馈
    isLink: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.collapseItem.isLink
    },
    // 是否开启点击反馈
    clickable: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.collapseItem.clickable
    },
    // 是否显示内边框
    border: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.collapseItem.border
    },
    // 标题的对齐方式
    align: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.collapseItem.align
    },
    // 唯一标识符
    name: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.props.collapseItem.name
    },
    // 标题左侧图片，可为绝对路径的图片或内置图标
    icon: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.collapseItem.icon
    },
    // 面板展开收起的过渡时间，单位ms
    duration: {
      type: Number,
      default: () => uni_modules_uviewPlus_libs_config_props.props.collapseItem.duration
    },
    // 显示右侧图标
    showRight: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.collapseItem.showRight
    },
    // 左侧图标样式
    iconStyle: {
      type: [Object, String],
      default: () => {
        return uni_modules_uviewPlus_libs_config_props.props.collapseItem.iconStyle;
      }
    },
    // 右侧箭头图标的样式
    rightIconStyle: {
      type: [Object, String],
      default: () => {
        return uni_modules_uviewPlus_libs_config_props.props.collapseItem.rightIconStyle;
      }
    },
    cellCustomStyle: {
      type: [Object, String],
      default: () => {
        return uni_modules_uviewPlus_libs_config_props.props.collapseItem.cellCustomStyle;
      }
    },
    cellCustomClass: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.collapseItem.cellCustomClass
    }
  }
});
exports.props = props;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-collapse-item/props.js.map
