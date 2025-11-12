"use strict";
const utils_request = require("../utils/request.js");
function getArtStylesApi() {
  return utils_request.service({
    url: "/art-styles",
    method: "get"
  });
}
function getFeaturedApi() {
  return utils_request.service({
    url: "/featured",
    method: "get"
  });
}
exports.getArtStylesApi = getArtStylesApi;
exports.getFeaturedApi = getFeaturedApi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/common.js.map
