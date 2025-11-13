"use strict";
const utils_request = require("../utils/request.js");
function getPostsApi(params) {
  return utils_request.service({
    url: "/posts",
    method: "get",
    params
  });
}
function getCollectionsApi(params) {
  return utils_request.service({
    url: "/collections",
    method: "get",
    params
  });
}
function likePostApi(postId, data) {
  return utils_request.service({
    url: `/posts/${postId}/like`,
    method: "post",
    data
  });
}
function collectPostApi(postId, data) {
  return utils_request.service({
    url: `/posts/${postId}/collect`,
    method: "post",
    data
  });
}
function addCommentApi(postId, data) {
  return utils_request.service({
    url: `/posts/${postId}/comments`,
    method: "post",
    data
  });
}
function deletePostApi(postId, params) {
  return utils_request.service({
    url: `/posts/${postId}`,
    method: "delete",
    params
  });
}
exports.addCommentApi = addCommentApi;
exports.collectPostApi = collectPostApi;
exports.deletePostApi = deletePostApi;
exports.getCollectionsApi = getCollectionsApi;
exports.getPostsApi = getPostsApi;
exports.likePostApi = likePostApi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/post.js.map
