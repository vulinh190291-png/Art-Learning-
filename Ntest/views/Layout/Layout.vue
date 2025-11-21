<template>
  <div class="login-container">
    <el-card class="login-card">
      <div slot="header" class="clearfix">
        <span style="font-weight: bold; font-size: 18px;">🎨 艺术学习平台管理端</span>
      </div>
      
      <el-form ref="form" :model="form" label-width="0px">
        <el-form-item>
          <el-input 
            prefix-icon="el-icon-user" 
            v-model="form.username" 
            placeholder="请输入账号 (admin)"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input 
            prefix-icon="el-icon-lock" 
            v-model="form.password" 
            type="password" 
            placeholder="请输入密码 (123456)"
            @keyup.enter.native="handleLogin"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="handleLogin">
            立即登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleLogin() {
      // 这里先做模拟登录
      if (this.form.username && this.form.password) {
        this.$message.success('登录成功');
        // 跳转到 Layout 下的 home
        this.$router.push('/layout/home');
      } else {
        this.$message.warning('请输入账号和密码');
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b; /* 深色背景 */
  background-image: linear-gradient(to bottom right, #2d3a4b, #1a232e);
}

.login-card {
  width: 400px;
  border: none;
}
</style>