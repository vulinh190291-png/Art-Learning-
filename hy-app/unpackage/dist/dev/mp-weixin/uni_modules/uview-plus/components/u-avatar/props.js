"use strict";
const uni_modules_uviewPlus_libs_vue = require("../../libs/vue.js");
const uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const uni_modules_uviewPlus_libs_function_test = require("../../libs/function/test.js");
const props = uni_modules_uviewPlus_libs_vue.defineMixin({
  props: {
    // 头像图片路径(不能为相对路径)
    src: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.avatar.src
    },
    // 头像形状，circle-圆形，square-方形
    shape: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.avatar.shape
    },
    // 头像尺寸
    size: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.props.avatar.size
    },
    // 裁剪模式
    mode: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.avatar.mode
    },
    // 显示的文字
    text: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.avatar.text
    },
    // 背景色
    bgColor: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.avatar.bgColor
    },
    // 文字颜色
    color: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.avatar.color
    },
    // 文字大小
    fontSize: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.props.avatar.fontSize
    },
    // 显示的图标
    icon: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.avatar.icon
    },
    // 显示小程序头像，只对百度，微信，QQ小程序有效
    mpAvatar: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.avatar.mpAvatar
    },
    // 是否使用随机背景色
    randomBgColor: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.avatar.randomBgColor
    },
    // 加载失败的默认头像(组件有内置默认图片)
    defaultUrl: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.avatar.defaultUrl
    },
    // 如果配置了randomBgColor为true，且配置了此值，则从默认的背景色数组中取出对应索引的颜色值，取值0-19之间
    colorIndex: {
      type: [String, Number],
      // 校验参数规则，索引在0-19之间
      validator(n) {
        return uni_modules_uviewPlus_libs_function_test.test.range(n, [0, 19]) || n === "";
      },
      default: () => uni_modules_uviewPlus_libs_config_props.props.avatar.colorIndex
    },
    // 组件标识符
    name: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.avatar.name
    }
  }
});
exports.props = props;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-avatar/props.js.map
