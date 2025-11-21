<template>
  <div style="background: white; padding: 40px; border: 10px solid red; text-align: center;">
    <h1 style="color: red; font-size: 30px; font-weight: bold;">🛑 终于出来啦！</h1>
    <p style="font-size: 20px; margin: 20px 0;">
      当前是由 router/index.js 直接渲染的 Login 组件。
    </p>
    
    <div style="border: 2px dashed blue; padding: 20px; margin-top: 20px;">
      <el-button type="primary" @click="goHome">测试跳转到首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    goHome() {
      console.log('尝试跳转到 /layout/home');
      this.$router.push('/layout/home');
    }
  }
}
</script>