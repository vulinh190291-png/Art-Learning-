<template>
  <div class="navbar">
    <div class="breadcrumb">
      当前位置：{{ $route.meta.title || '首页' }}
    </div>
    <div class="right-menu">
      <el-dropdown>
        <span class="el-dropdown-link">
          管理员 <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const logout = () => {
  localStorage.removeItem('hy-token')
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  height: 50px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}
.right-menu { cursor: pointer; }
</style>