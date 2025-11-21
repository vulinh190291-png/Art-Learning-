<template>
  <div class="login-container">
    <el-card class="login-card">
      <div slot="header" class="clearfix">
        <span style="font-weight: bold; font-size: 18px;">🎨 艺术平台管理端</span>
      </div>
      <el-form :model="loginForm" status-icon ref="loginForm" label-width="0">
        <el-form-item>
          <el-input type="text" v-model="loginForm.username" placeholder="管理员账号" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="loginForm.password" placeholder="密码" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="handleLogin" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import request from '@/common/request.js';

export default {
  data() {
    return {
      loginForm: { username: '', password: '' },
      loading: false
    }
  },
  methods: {
    async handleLogin() {
      if(!this.loginForm.username || !this.loginForm.password) {
        return this.$message.warning('请输入账号密码');
      }
      
      this.loading = true;
      try {
        // 模拟登录，真实环境请打开下面的注释
        // const res = await request({ url: '/login', method: 'POST', data: this.loginForm });
        
        // 模拟成功
        const mockRes = { token: 'mock-jwt-token-123', userInfo: { name: 'Admin' } };
        
        this.$store.commit('LOGIN', mockRes);
        this.$message.success('登录成功');
        uni.reLaunch({ url: '/pages/index/index' });
        
      } catch(e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.login-container { display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f0f2f5; }
.login-card { width: 400px; }
</style>