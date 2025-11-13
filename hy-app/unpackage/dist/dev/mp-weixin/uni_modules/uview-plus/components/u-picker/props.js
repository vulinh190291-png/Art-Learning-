"use strict";
const uni_modules_uviewPlus_libs_vue = require("../../libs/vue.js");
const uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = uni_modules_uviewPlus_libs_vue.defineMixin({
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    hasInput: {
      type: Boolean,
      default: false
    },
    inputProps: {
      type: Object,
      default: () => {
        return {};
      }
    },
    disabled: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.picker.disabled
    },
    disabledColor: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.picker.disabledColor
    },
    placeholder: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.picker.placeholder
    },
    // 是否展示picker弹窗
    show: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.picker.show
    },
    // 弹出的方向，可选值为 top bottom right left center
    popupMode: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.picker.popupMode
    },
    // 是否展示顶部的操作栏
    showToolbar: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.picker.showToolbar
    },
    // 顶部标题
    title: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.picker.title
    },
    // 对象数组，设置每一列的数据
    columns: {
      type: Array,
      default: () => uni_modules_uviewPlus_libs_config_props.props.picker.columns
    },
    // 是否显示加载中状态
    loading: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.picker.loading
    },
    // 各列中，单个选项的高度
    itemHeight: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.props.picker.itemHeight
    },
    // 取消按钮的文字
    cancelText: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.picker.cancelText
    },
    // 确认按钮的文字
    confirmText: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.picker.confirmText
    },
    // 取消按钮的颜色
    cancelColor: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.picker.cancelColor
    },
    // 确认按钮的颜色
    confirmColor: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.picker.confirmColor
    },
    // 每列中可见选项的数量
    visibleItemCount: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.props.picker.visibleItemCount
    },
    // 选项对象中，需要展示的属性键名
    keyName: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.picker.keyName
    },
    // 选项对象中，需要获取的属性值键名
    valueName: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.picker.valueName
    },
    // 是否允许点击遮罩关闭选择器
    closeOnClickOverlay: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.picker.closeOnClickOverlay
    },
    // 各列的默认索引
    defaultIndex: {
      type: Array,
      default: () => uni_modules_uviewPlus_libs_config_props.props.picker.defaultIndex
    },
    // 是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件，只在微信2.21.1及以上有效
    immediateChange: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.picker.immediateChange
    },
    // 工具栏右侧插槽是否开启
    toolbarRightSlot: {
      type: Boolean,
      default: false
    },
    // 层级
    zIndex: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.props.picker.zIndex
    }
  }
});
exports.props = props;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-picker/props.js.map
