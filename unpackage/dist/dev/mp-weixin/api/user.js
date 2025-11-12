"use strict";
const utils_request = require("../utils/request.js");
function loginApi(data) {
  return utils_request.service({
    url: "/login",
    method: "post",
    data
  });
}
function registerApi(data) {
  return utils_request.service({
    url: "/register",
    method: "post",
    data
  });
}
function updateProfileApi(data) {
  return utils_request.service({
    url: "/profile",
    method: "put",
    data
  });
}
exports.loginApi = loginApi;
exports.registerApi = registerApi;
exports.updateProfileApi = updateProfileApi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/user.js.map
