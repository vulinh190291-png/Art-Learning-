"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uviewPlus_components_uCollapseItem_props = require("./props.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
const uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js");
const uni_modules_uviewPlus_libs_function_test = require("../../libs/function/test.js");
const _sfc_main = {
  name: "u-collapse-item",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uCollapseItem_props.props],
  data() {
    return {
      elId: uni_modules_uviewPlus_libs_function_index.guid(),
      // uni.createAnimation的导出数据
      animationData: {},
      // 是否展开状态
      expanded: false,
      // 根据expanded确定是否显示border，为了控制展开时，cell的下划线更好的显示效果，进行一定时间的延时
      showBorder: false,
      // 是否动画中，如果是则不允许继续触发点击
      animating: false,
      // 父组件u-collapse的参数
      parentData: {
        accordion: false,
        border: false
      }
    };
  },
  watch: {
    expanded(n) {
      clearTimeout(this.timer);
      this.timer = null;
      this.timer = setTimeout(() => {
        this.showBorder = n;
      }, n ? 10 : 290);
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    // 异步获取内容，或者动态修改了内容时，需要重新初始化
    async init() {
      this.updateParentData();
      if (!this.parent) {
        return uni_modules_uviewPlus_libs_function_index.error("u-collapse-item必须要搭配u-collapse组件使用");
      }
      const {
        value,
        accordion,
        children = []
      } = this.parent;
      if (accordion) {
        if (uni_modules_uviewPlus_libs_function_test.test.array(value)) {
          return uni_modules_uviewPlus_libs_function_index.error("手风琴模式下，u-collapse组件的value参数不能为数组");
        }
        this.expanded = this.name == value;
      } else {
        if (!uni_modules_uviewPlus_libs_function_test.test.array(value) && value !== null) {
          return uni_modules_uviewPlus_libs_function_index.error("非手风琴模式下，u-collapse组件的value参数必须为数组");
        }
        this.expanded = (value || []).some((item) => item == this.name);
      }
      await common_vendor.nextTick$1();
      this.setContentAnimate();
    },
    updateParentData() {
      this.getParentData("u-collapse");
    },
    async setContentAnimate() {
      const rect = await this.queryRect();
      const height = this.expanded ? rect.height : 0;
      this.animating = true;
      const animation = common_vendor.index.createAnimation({
        timingFunction: "ease-in-out"
      });
      animation.height(height).step({
        duration: this.duration
      }).step();
      this.animationData = animation.export();
      uni_modules_uviewPlus_libs_function_index.sleep(this.duration).then(() => {
        this.animating = false;
      });
    },
    // 点击collapsehead头部
    clickHandler() {
      if (this.disabled && this.animating)
        return;
      this.parent && this.parent.onChange(this);
    },
    // 查询内容高度
    queryRect() {
      return new Promise((resolve) => {
        this.$uGetRect(`#${this.elId}`).then((size) => {
          resolve(size);
        });
      });
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_cell2 = common_vendor.resolveComponent("u-cell");
  const _easycom_u_line2 = common_vendor.resolveComponent("u-line");
  (_easycom_u_icon2 + _easycom_u_cell2 + _easycom_u_line2)();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
const _easycom_u_cell = () => "../u-cell/u-cell.js";
const _easycom_u_line = () => "../u-line/u-line.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_cell + _easycom_u_line)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !_ctx.$slots.title && _ctx.title
  }, !_ctx.$slots.title && _ctx.title ? {
    b: common_vendor.t(_ctx.title)
  } : {}, {
    c: !_ctx.$slots.icon && _ctx.icon
  }, !_ctx.$slots.icon && _ctx.icon ? {
    d: common_vendor.p({
      size: 22,
      name: _ctx.icon
    })
  } : {}, {
    e: !_ctx.$slots.value && _ctx.value
  }, !_ctx.$slots.value && _ctx.value ? {
    f: common_vendor.t(_ctx.value)
  } : {}, {
    g: _ctx.showRight
  }, _ctx.showRight ? common_vendor.e({
    h: !_ctx.$slots["right-icon"]
  }, !_ctx.$slots["right-icon"] ? {
    i: common_vendor.p({
      size: 16,
      name: "arrow-right"
    })
  } : {}) : {}, {
    j: common_vendor.o($options.clickHandler),
    k: common_vendor.p({
      title: _ctx.$slots.title ? "" : _ctx.title,
      value: _ctx.value,
      label: _ctx.label,
      icon: _ctx.icon,
      isLink: _ctx.isLink,
      clickable: _ctx.clickable,
      border: $data.parentData.border && $data.showBorder,
      arrowDirection: $data.expanded ? "up" : "down",
      disabled: _ctx.disabled,
      customClass: _ctx.cellCustomClass,
      customStyle: _ctx.cellCustomStyle
    }),
    l: $data.elId,
    m: $data.elId,
    n: $data.animationData,
    o: $data.parentData.border
  }, $data.parentData.border ? {} : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-82f3baf9"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-collapse-item/u-collapse-item.js.map
