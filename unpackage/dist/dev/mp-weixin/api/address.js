"use strict";
const utils_request = require("../utils/request.js");
function getAddressesApi(params) {
  return utils_request.service({
    url: "/addresses",
    method: "get",
    params
  });
}
function addAddressApi(data) {
  return utils_request.service({
    url: "/addresses",
    method: "post",
    data
  });
}
function updateAddressApi(addressId, data) {
  return utils_request.service({
    url: `/addresses/${addressId}`,
    method: "put",
    data
  });
}
function deleteAddressApi(addressId, data) {
  return utils_request.service({
    url: `/addresses/${addressId}`,
    method: "delete",
    data
  });
}
function setDefaultAddressApi(addressId, data) {
  return utils_request.service({
    url: `/addresses/${addressId}/default`,
    method: "post",
    data
  });
}
exports.addAddressApi = addAddressApi;
exports.deleteAddressApi = deleteAddressApi;
exports.getAddressesApi = getAddressesApi;
exports.setDefaultAddressApi = setDefaultAddressApi;
exports.updateAddressApi = updateAddressApi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/address.js.map
