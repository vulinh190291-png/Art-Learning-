import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('hy-token')
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  error => Promise.reject(error)
)

service.interceptors.response.use(
  response => {
    const res = response.data
    // 后端 ResultCodes.SUCCESS = 200
    if (res.code !== 200) {
      ElMessage.error(res.message || '系统错误')
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res.data
    }
  },
  error => {
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service