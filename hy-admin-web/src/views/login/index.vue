<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 style="text-align: center">HyAll 管理后台</h2>
      <el-form :model="loginForm">
        <el-form-item>
          <el-input v-model="loginForm.userName" placeholder="用户名" prefix-icon="User"/>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginForm.password" type="password" placeholder="密码" prefix-icon="Lock"/>
        </el-form-item>
        <el-button type="primary" style="width: 100%" @click="handleLogin">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const loginForm = ref({ userName: '', password: '' })

const handleLogin = async () => {
  try {
    const token = await login(loginForm.value)
    localStorage.setItem('hy-token', token)
    ElMessage.success('登录成功')
    router.push('/')
  } catch(e) {}
}
</script>

<style scoped>
.login-container { height: 100vh; background: #2d3a4b; display: flex; align-items: center; justify-content: center;}
.login-card { width: 400px; }
</style>