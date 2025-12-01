<template>
  <el-menu
    :default-active="$route.path"
    background-color="#304156"
    text-color="#bfcbd9"
    active-text-color="#409EFF"
    router
    unique-opened
    style="border: none;"
  >
    <div class="logo-container">HyAll 管理系统</div>
    
    <el-menu-item index="/dashboard">
      <el-icon><Odometer /></el-icon><span>首页</span>
    </el-menu-item>

    <el-sub-menu index="user">
      <template #title><el-icon><User /></el-icon><span>用户管理</span></template>
      <el-menu-item index="/user/list">会员管理</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="mall">
      <template #title><el-icon><ShoppingBag /></el-icon><span>易市管理</span></template>
      <el-menu-item index="/mall/goods">商品列表</el-menu-item>
      <el-menu-item index="/mall/order">订单管理</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="edu">
      <template #title><el-icon><Reading /></el-icon><span>教育中心</span></template>
      <el-menu-item index="/edu/course">课程管理</el-menu-item>
      <el-menu-item index="/edu/instructor">讲师管理</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="content">
      <template #title><el-icon><Document /></el-icon><span>内容管理</span></template>
      <el-menu-item index="/content/post">帖子审核</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped>
.logo-container {
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  font-weight: 600;
  font-size: 18px;
  background-color: #2b3649;
}
</style>