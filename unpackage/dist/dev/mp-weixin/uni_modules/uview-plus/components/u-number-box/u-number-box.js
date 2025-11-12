"use strict";
const uni_modules_uviewPlus_components_uNumberBox_props = require("./props.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
const uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-number-box",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uNumberBox_props.props],
  data() {
    return {
      // 输入框实际操作的值
      currentValue: "",
      // 定时器
      longPressTimer: null
    };
  },
  watch: {
    // 多个值之间，只要一个值发生变化，都要重新检查check()函数
    watchChange(n) {
      this.check();
    },
    // 监听v-mode的变化，重新初始化内部的值
    modelValue: {
      handler: function(newV, oldV) {
        if (newV !== this.currentValue) {
          this.currentValue = this.format(this.modelValue);
        }
      },
      immediate: true
    }
  },
  computed: {
    hideMinus() {
      return this.currentValue == 0 && this.miniMode == true;
    },
    getCursorSpacing() {
      return uni_modules_uviewPlus_libs_function_index.getPx(this.cursorSpacing);
    },
    // 按钮的样式
    buttonStyle() {
      return (type) => {
        const style = {
          backgroundColor: this.bgColor,
          width: uni_modules_uviewPlus_libs_function_index.addUnit(this.buttonWidth),
          height: uni_modules_uviewPlus_libs_function_index.addUnit(this.buttonSize),
          color: this.color,
          borderRadius: this.buttonRadius
        };
        if (this.isDisabled(type)) {
          style.backgroundColor = "#f7f8fa";
        }
        return style;
      };
    },
    // 输入框的样式
    inputStyle() {
      this.disabled || this.disabledInput;
      const style = {
        color: this.color,
        backgroundColor: this.inputBgColor || this.bgColor,
        height: uni_modules_uviewPlus_libs_function_index.addUnit(this.buttonSize),
        width: uni_modules_uviewPlus_libs_function_index.addUnit(this.inputWidth)
      };
      return style;
    },
    // 用于监听多个值发生变化
    watchChange() {
      return [this.integer, this.decimalLength, this.min, this.max];
    },
    isDisabled() {
      return (type) => {
        if (type === "plus") {
          return this.disabled || this.disablePlus || this.currentValue >= this.max;
        }
        return this.disabled || this.disableMinus || this.currentValue <= this.min;
      };
    }
  },
  mounted() {
    this.init();
  },
  emits: ["update:modelValue", "focus", "blur", "overlimit", "change", "plus", "minus"],
  methods: {
    init() {
      this.currentValue = this.format(this.modelValue);
    },
    // 格式化整理数据，限制范围
    format(value) {
      value = this.filter(value);
      value = value === "" ? 0 : +value;
      value = Math.max(Math.min(this.max, value), this.min);
      if (this.decimalLength !== null) {
        value = value.toFixed(this.decimalLength);
      }
      return value;
    },
    // 过滤非法的字符
    filter(value) {
      value = String(value).replace(/[^0-9.-]/g, "");
      if (this.integer && value.indexOf(".") !== -1) {
        value = value.split(".")[0];
      }
      return value;
    },
    check() {
      const val = this.format(this.currentValue);
      if (val !== this.currentValue) {
        this.currentValue = val;
        this.emitChange(val);
      }
    },
    // 判断是否出于禁止操作状态
    // isDisabled(type) {
    // 	if (type === 'plus') {
    // 		// 在点击增加按钮情况下，判断整体的disabled，是否单独禁用增加按钮，以及当前值是否大于最大的允许值
    // 		return (
    // 			this.disabled ||
    // 			this.disablePlus ||
    // 			this.currentValue >= this.max
    // 		)
    // 	}
    // 	// 点击减少按钮同理
    // 	return (
    // 		this.disabled ||
    // 		this.disableMinus ||
    // 		this.currentValue <= this.min
    // 	)
    // },
    // 输入框活动焦点
    onFocus(event) {
      this.$emit("focus", {
        ...event.detail,
        name: this.name
      });
    },
    // 输入框失去焦点
    onBlur(event) {
      this.format(event.detail.value);
      this.$emit(
        "blur",
        {
          ...event.detail,
          name: this.name
        }
      );
    },
    // 输入框值发生变化
    onInput(e) {
      const {
        value = ""
      } = e.detail || {};
      if (value === "") {
        this.emitChange(this.min);
        return;
      }
      let formatted = this.filter(value);
      this.emitChange(value);
      if (this.decimalLength !== null && formatted.indexOf(".") !== -1) {
        const pair = formatted.split(".");
        formatted = `${pair[0]}.${pair[1].slice(0, this.decimalLength)}`;
      }
      formatted = this.format(formatted);
      this.emitChange(formatted);
      return formatted;
    },
    // 发出change事件，type目前只支持点击时有值，手动输入不支持。
    emitChange(value, type = "") {
      if (!this.asyncChange) {
        this.$nextTick(() => {
          this.$emit("update:modelValue", value);
          this.currentValue = value;
          this.$forceUpdate();
        });
      }
      this.$emit("change", {
        value,
        name: this.name,
        type
        // 当前变更类型
      });
    },
    onChange() {
      const {
        type
      } = this;
      if (this.isDisabled(type)) {
        return this.$emit("overlimit", type);
      }
      const diff = type === "minus" ? -this.step : +this.step;
      const value = this.format(this.add(+this.currentValue, diff));
      this.emitChange(value, type);
      this.$emit(type);
    },
    // 对值扩大后进行四舍五入，再除以扩大因子，避免出现浮点数操作的精度问题
    add(num1, num2) {
      const cardinal = Math.pow(10, 10);
      return Math.round((num1 + num2) * cardinal) / cardinal;
    },
    // 点击加减按钮
    clickHandler(type) {
      this.type = type;
      this.onChange();
    },
    longPressStep() {
      this.clearTimeout();
      this.longPressTimer = setTimeout(() => {
        this.onChange();
        this.longPressStep();
      }, 250);
    },
    onTouchStart(type) {
      if (!this.longPress)
        return;
      this.clearTimeout();
      this.type = type;
      this.longPressTimer = setTimeout(() => {
        this.onChange();
        this.longPressStep();
      }, 600);
    },
    // 触摸结束，清除定时器，停止长按加减
    onTouchEnd() {
      if (!this.longPress)
        return;
      this.clearTimeout();
    },
    // 清除定时器
    clearTimeout() {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.showMinus && !$options.hideMinus && _ctx.$slots.minus
  }, _ctx.showMinus && !$options.hideMinus && _ctx.$slots.minus ? {
    b: common_vendor.o(($event) => $options.clickHandler("minus")),
    c: common_vendor.o(($event) => $options.onTouchStart("minus")),
    d: common_vendor.o((...args) => $options.clearTimeout && $options.clearTimeout(...args))
  } : _ctx.showMinus && !$options.hideMinus ? {
    f: common_vendor.p({
      name: "minus",
      color: $options.isDisabled("minus") ? "#c8c9cc" : "#323233",
      size: "15",
      bold: true,
      customStyle: _ctx.iconStyle
    }),
    g: common_vendor.o(($event) => $options.clickHandler("minus")),
    h: common_vendor.o(($event) => $options.onTouchStart("minus")),
    i: common_vendor.o((...args) => $options.clearTimeout && $options.clearTimeout(...args)),
    j: $options.isDisabled("minus") ? 1 : "",
    k: common_vendor.s($options.buttonStyle("minus"))
  } : {}, {
    e: _ctx.showMinus && !$options.hideMinus,
    l: !$options.hideMinus
  }, !$options.hideMinus ? {
    m: _ctx.disabledInput || _ctx.disabled,
    n: $options.getCursorSpacing,
    o: _ctx.disabled || _ctx.disabledInput ? 1 : "",
    p: $data.currentValue,
    q: common_vendor.o((...args) => $options.onBlur && $options.onBlur(...args)),
    r: common_vendor.o((...args) => $options.onFocus && $options.onFocus(...args)),
    s: common_vendor.o((...args) => $options.onInput && $options.onInput(...args)),
    t: common_vendor.s($options.inputStyle)
  } : {}, {
    v: _ctx.showPlus && _ctx.$slots.plus
  }, _ctx.showPlus && _ctx.$slots.plus ? {
    w: common_vendor.o(($event) => $options.clickHandler("plus")),
    x: common_vendor.o(($event) => $options.onTouchStart("plus")),
    y: common_vendor.o((...args) => $options.clearTimeout && $options.clearTimeout(...args))
  } : _ctx.showPlus ? {
    A: common_vendor.p({
      name: "plus",
      color: $options.isDisabled("plus") ? "#c8c9cc" : "#323233",
      size: "15",
      bold: true,
      customStyle: _ctx.iconStyle
    }),
    B: common_vendor.o(($event) => $options.clickHandler("plus")),
    C: common_vendor.o(($event) => $options.onTouchStart("plus")),
    D: common_vendor.o((...args) => $options.clearTimeout && $options.clearTimeout(...args)),
    E: $options.isDisabled("plus") ? 1 : "",
    F: common_vendor.s($options.buttonStyle("plus"))
  } : {}, {
    z: _ctx.showPlus
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-eb6f6237"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-number-box/u-number-box.js.map
