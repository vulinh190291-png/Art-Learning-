<template>
  <div id="app-container">
    <!-- 1. 顶部调试条：显示当前路由状态 -->
    <div style="position: fixed; top: 0; left: 0; width: 100%; height: 40px; background: yellow; color: black; z-index: 9999; line-height: 40px; text-align: center; font-weight: bold;">
      当前路由: [{{ $route.path }}] | 匹配组件数: {{ $route.matched.length }}
    </div>

    <!-- 2. 路由出口：内容应该在这里显示 -->
    <!-- 如果这里是空的，你会看到下面的粉色背景 -->
    <div class="router-box">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppEntry',
  mounted() {
    console.log('AppEntry 加载成功，当前路由:', this.$route.path);
  }
}
</script>

<style>
/* 强制撑开高度，加个粉色背景证明它活着 */
#app-container {
  min-height: 100vh;
  width: 100vw;
  background-color: pink; /* ⚠️ 诊断色：粉色 */
  padding-top: 40px;      /* 给黄条留位置 */
  box-sizing: border-box;
}

.router-box {
  height: 100%;
  width: 100%;
  border: 5px solid blue; /* ⚠️ 诊断框：蓝色 */
}
</style>