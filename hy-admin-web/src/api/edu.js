import request from '@/utils/request'

// 课程
export function getCourseBatch(ids) {
  return request.post('/course/batch', ids)
}
export function deleteCourse(courseId) {
  return request.delete('/course', { data: courseId })
}
export function updateCourse(data) {
  return request.put('/course', data)
}

// 讲师
export function getInstructor(id) {
  // 注意：后端用 @RequestBody Integer，这是不标准的 GET 写法
  // 建议改为 POST 搜索或者让后端改 @RequestParam
  // 此处尝试 hack: axios get with data (部分浏览器/服务器可能不支持)
  // 如果失败，请让后端改为 @RequestParam
  return request.get('/instructor', { data: id }) 
}