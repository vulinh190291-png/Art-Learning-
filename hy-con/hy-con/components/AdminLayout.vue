<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="220px" style="background-color: #304156;">
      <div class="logo">🎨 艺术管理后台</div>
      <el-menu
        :default-active="activeMenu"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#409EFF"
        @select="handleSelect">
        
        <el-menu-item index="/pages/index/index">
          <i class="el-icon-s-data"></i>
          <span slot="title">数据概览</span>
        </el-menu-item>

        <el-submenu index="user">
          <template slot="title"><i class="el-icon-user-solid"></i>用户管理</template>
          <el-menu-item index="/pages/user/list">用户列表(小黑屋)</el-menu-item>
        </el-submenu>

        <el-submenu index="product">
          <template slot="title"><i class="el-icon-picture"></i>艺术品/商品</template>
          <el-menu-item index="/pages/product/list">作品管理</el-menu-item>
        </el-submenu>
        
        <el-menu-item index="logout">
           <i class="el-icon-switch-button"></i>
           <span slot="title">退出登录</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header style="text-align: right; font-size: 12px; line-height: 60px; border-bottom: 1px solid #ddd;">
        <span style="margin-right: 15px; font-size: 14px;">你好，管理员</span>
        <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      </el-header>
      
      <el-main>
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      activeMenu: '/pages/index/index'
    }
  },
  mounted() {
    // 获取当前路由，高亮菜单
    const pages = getCurrentPages();
    const page = pages[pages.length - 1];
    this.activeMenu = '/' + page.route;
  },
  methods: {
    handleSelect(index) {
      if (index === 'logout') {
        this.$store.commit('LOGOUT');
        uni.reLaunch({ url: '/pages/login/login' });
      } else {
        uni.navigateTo({ url: index });
      }
    }
  }
}
</script>

<style scoped>
.logo {
  height: 60px;
  line-height: 60px;
  color: #fff;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  background-color: #2b3a4d;
}
</style>