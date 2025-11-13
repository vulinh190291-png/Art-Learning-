"use strict";
const uni_modules_uviewPlus_components_uForm_props = require("../u-form/props.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
const common_vendor = require("../../../../common/vendor.js");
const uvForm = () => "../u-form/u-form.js";
const _sfc_main = {
  name: "u-form",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_components_uForm_props.props, uni_modules_uviewPlus_libs_mixin_mixin.mixin],
  components: {
    uvForm
  },
  created() {
    this.children = [];
  },
  methods: {
    // 手动设置校验的规则，如果规则中有函数的话，微信小程序中会过滤掉，所以只能手动调用设置规则
    setRules(rules) {
      this.$refs.uForm.setRules(rules);
    },
    /**
     * 校验全部数据
     * @param {Object} options
     * @param {Boolean} options.showErrorMsg -是否显示校验信息，
     */
    validate(options) {
      this.setMpData();
      return this.$refs.uForm.validate(options);
    },
    validateField(value, callback) {
      this.setMpData();
      return this.$refs.uForm.validateField(value, callback);
    },
    resetFields() {
      this.setMpData();
      return this.$refs.uForm.resetFields();
    },
    clearValidate(props) {
      this.setMpData();
      return this.$refs.uForm.clearValidate(props);
    },
    setMpData() {
      this.$refs.uForm.children = this.children;
    }
  }
};
if (!Array) {
  const _component_uvForm = common_vendor.resolveComponent("uvForm");
  _component_uvForm();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sr("uForm", "9902f2f0-0"),
    b: common_vendor.p({
      model: _ctx.model,
      rules: _ctx.rules,
      errorType: _ctx.errorType,
      borderBottom: _ctx.borderBottom,
      labelPosition: _ctx.labelPosition,
      labelWidth: _ctx.labelWidth,
      labelAlign: _ctx.labelAlign,
      labelStyle: _ctx.labelStyle,
      customStyle: _ctx.customStyle
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u--form/u--form.js.map
