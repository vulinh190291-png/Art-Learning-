"use strict";
const uni_modules_uviewPlus_libs_vue = require("../../libs/vue.js");
const uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = uni_modules_uviewPlus_libs_vue.defineMixin({
  props: {
    // 轮播的长度
    length: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.props.swiperIndicator.length
    },
    // 当前处于活动状态的轮播的索引
    current: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.props.swiperIndicator.current
    },
    // 指示器非激活颜色
    indicatorActiveColor: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.swiperIndicator.indicatorActiveColor
    },
    // 指示器的激活颜色
    indicatorInactiveColor: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.swiperIndicator.indicatorInactiveColor
    },
    // 指示器模式，line-线型，dot-点型
    indicatorMode: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.swiperIndicator.indicatorMode
    }
  }
});
exports.props = props;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-swiper-indicator/props.js.map
