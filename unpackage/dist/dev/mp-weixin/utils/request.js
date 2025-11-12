"use strict";
const common_vendor = require("../common/vendor.js");
const service = common_vendor.axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 1e4,
  // 10秒
  adapter: common_vendor.uniappAdapter
});
service.interceptors.request.use(
  (config) => {
    common_vendor.index.showLoading({
      title: "加载中...",
      mask: true
    });
    if (!config.headers) {
      config.headers = {};
    }
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    common_vendor.index.__f__("error", "at utils/request.js:29", "请求拦截器错误:", error);
    common_vendor.index.hideLoading();
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  (response) => {
    common_vendor.index.hideLoading();
    const res = response.data;
    if (res.success) {
      return res;
    } else {
      common_vendor.index.showToast({
        title: res.message || "操作失败",
        icon: "none",
        duration: 2e3
      });
      return Promise.reject(new Error(res.message || "Error"));
    }
  },
  (error) => {
    common_vendor.index.hideLoading();
    common_vendor.index.__f__("error", "at utils/request.js:56", "响应拦截器错误:", error);
    let message = "网络错误，请稍后重试";
    if (error.response) {
      switch (error.response.status) {
        case 401:
          message = "登录状态失效，请重新登录";
          break;
        case 404:
          message = "请求的资源未找到";
          break;
        case 500:
          message = "服务器内部错误";
          break;
        default:
          message = error.response.data.message || message;
      }
    } else if (error.message && error.message.includes("timeout")) {
      message = "请求超时，请检查网络";
    }
    common_vendor.index.showToast({
      title: message,
      icon: "none",
      duration: 2e3
    });
    return Promise.reject(error);
  }
);
exports.service = service;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map
