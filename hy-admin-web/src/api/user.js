import request from '@/utils/request'

export function login(data) {
  return request.post('/user/login', data)
}

export function getUserDetail(userId) {
  // 注意：后端 queryUser 参数是 @RequestParam Integer userId
  return request.get('/user', { params: { userId } })
}

export function deleteUser(userId) {
  return request.delete('/user', { params: { userId } })
}

// 模拟获取列表 (因为后端没有 queryAll 接口)
export function getBatchUsers(ids) {
  // 前端用 Promise.all 模拟
  const promises = ids.map(id => getUserDetail(id).catch(() => null))
  return Promise.all(promises)
}