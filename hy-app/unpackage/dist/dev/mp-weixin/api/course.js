"use strict";
const utils_request = require("../utils/request.js");
function getCoursesApi() {
  return utils_request.service({
    url: "/courses",
    method: "get"
  });
}
function getCourseDetailApi(courseId) {
  return utils_request.service({
    url: `/courses/${courseId}`,
    method: "get"
  });
}
function getCourseProgressApi(params) {
  return utils_request.service({
    url: "/progress",
    method: "get",
    params
  });
}
function updateCourseProgressApi(data) {
  return utils_request.service({
    url: "/progress",
    method: "post",
    data
  });
}
function getCertificatesApi(params) {
  return utils_request.service({
    url: "/certificates",
    method: "get",
    params
  });
}
exports.getCertificatesApi = getCertificatesApi;
exports.getCourseDetailApi = getCourseDetailApi;
exports.getCourseProgressApi = getCourseProgressApi;
exports.getCoursesApi = getCoursesApi;
exports.updateCourseProgressApi = updateCourseProgressApi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/course.js.map
