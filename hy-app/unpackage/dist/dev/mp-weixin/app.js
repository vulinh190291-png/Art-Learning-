"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const uni_modules_uviewPlus_index = require("./uni_modules/uview-plus/index.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/gallery/gallery.js";
  "./pages/classroom/classroom.js";
  "./pages/market/market.js";
  "./pages/profile/profile.js";
  "./pages/login/login.js";
  "./pages/post/post.js";
  "./pages/course_detail/course_detail.js";
  "./pages/learning_player/learning_player.js";
  "./pages/certificate/certificate.js";
  "./pages/product_detail/product_detail.js";
  "./pages/cart/cart.js";
  "./pages/order_list/order_list.js";
  "./pages/achievements/achievements.js";
  "./pages/register/register.js";
  "./pages/my_collections/my_collections.js";
  "./pages/my_certificates/my_certificates.js";
  "./pages/address_management/address_management.js";
  "./pages/address_edit/address_edit.js";
  "./pages/map_picker/map_picker.js";
  "./pages/order_confirm/order_confirm.js";
  "./pages/order_detail/order_detail.js";
  "./pages/profile_edit/profile_edit.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:4", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:7", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:10", "App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(uni_modules_uviewPlus_index.uviewPlus);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
