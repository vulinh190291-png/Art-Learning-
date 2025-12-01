import { defineStore } from 'pinia'
import { ref } from 'vue'
// 如果你要做纯页面，下面这行API引用可以注释掉
// import { login, getUserInfo } from '@/api/user' 

export const useUserStore = defineStore('user', () => {
  // --- 状态 (State) ---
  const token = ref(localStorage.getItem('hy-token') || '')
  const name = ref('管理员') // 默认写死，方便纯页面展示
  const avatar = ref('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')

  // --- 动作 (Actions) ---
  
  // 登录动作 (纯页面版：直接模拟成功)
  const loginAction = async (loginForm) => {
    // 逻辑版写法 (注释掉)：
    // const res = await login(loginForm)
    // token.value = res
    // localStorage.setItem('hy-token', res)
    
    // 纯页面版写法：
    token.value = 'mock-token-123456'
    localStorage.setItem('hy-token', 'mock-token-123456')
    return true
  }

  // 退出动作
  const logout = () => {
    token.value = ''
    name.value = ''
    localStorage.removeItem('hy-token')
  }

  return { token, name, avatar, loginAction, logout }
})