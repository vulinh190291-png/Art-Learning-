"use strict";
const uni_modules_uviewPlus_components_uSwitch_props = require("./props.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
const uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-switch",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uSwitch_props.props],
  watch: {
    modelValue: {
      immediate: true,
      handler(n) {
        if (n !== this.inactiveValue && n !== this.activeValue) {
          uni_modules_uviewPlus_libs_function_index.error("v-model绑定的值必须为inactiveValue、activeValue二者之一");
        }
      }
    }
  },
  data() {
    return {
      bgColor: "#ffffff"
    };
  },
  computed: {
    isActive() {
      return this.modelValue === this.activeValue;
    },
    switchStyle() {
      let style = {};
      style.width = uni_modules_uviewPlus_libs_function_index.addUnit(this.size * 2 + 2);
      style.height = uni_modules_uviewPlus_libs_function_index.addUnit(Number(this.size) + 2);
      if (this.customInactiveColor) {
        style.borderColor = "rgba(0, 0, 0, 0)";
      }
      style.backgroundColor = this.isActive ? this.activeColor : this.inactiveColor;
      return style;
    },
    nodeStyle() {
      let style = {};
      style.width = uni_modules_uviewPlus_libs_function_index.addUnit(this.size - this.space);
      style.height = uni_modules_uviewPlus_libs_function_index.addUnit(this.size - this.space);
      const translateX = this.isActive ? uni_modules_uviewPlus_libs_function_index.addUnit(this.space) : uni_modules_uviewPlus_libs_function_index.addUnit(this.size);
      style.transform = `translateX(-${translateX})`;
      return style;
    },
    bgStyle() {
      let style = {};
      style.width = uni_modules_uviewPlus_libs_function_index.addUnit(Number(this.size) * 2 - this.size / 2);
      style.height = uni_modules_uviewPlus_libs_function_index.addUnit(this.size);
      style.backgroundColor = this.inactiveColor;
      style.transform = `scale(${this.isActive ? 0 : 1})`;
      return style;
    },
    customInactiveColor() {
      return this.inactiveColor !== "#fff" && this.inactiveColor !== "#ffffff";
    }
  },
  emits: ["update:modelValue", "change"],
  methods: {
    addStyle: uni_modules_uviewPlus_libs_function_index.addStyle,
    clickHandler() {
      if (!this.disabled && !this.loading) {
        const oldValue = this.isActive ? this.inactiveValue : this.activeValue;
        if (!this.asyncChange) {
          this.$emit("update:modelValue", oldValue);
        }
        this.$nextTick(() => {
          this.$emit("change", oldValue);
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  _easycom_u_loading_icon2();
}
const _easycom_u_loading_icon = () => "../u-loading-icon/u-loading-icon.js";
if (!Math) {
  _easycom_u_loading_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.s($options.bgStyle),
    b: common_vendor.p({
      show: _ctx.loading,
      mode: "circle",
      timingFunction: "linear",
      color: _ctx.modelValue ? _ctx.activeColor : "#AAABAD",
      size: _ctx.size * 0.6
    }),
    c: common_vendor.n(_ctx.modelValue && "u-switch__node--on"),
    d: common_vendor.s($options.nodeStyle),
    e: common_vendor.n(_ctx.disabled && "u-switch--disabled"),
    f: common_vendor.s($options.switchStyle),
    g: common_vendor.s($options.addStyle(_ctx.customStyle)),
    h: common_vendor.o((...args) => $options.clickHandler && $options.clickHandler(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6ab257b3"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-switch/u-switch.js.map
