<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <navbar />
      <app-main />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
import AppMain from './components/AppMain.vue'
</script>

<style scoped>
.app-wrapper {
  display: flex;
  height: 100%;
  width: 100%;
}
.sidebar-container {
  width: 200px;
  background-color: #304156;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-y: auto;
}
.main-container {
  min-height: 100%;
  margin-left: 200px;
  width: calc(100% - 200px);
  background-color: #f0f2f5;
  transition: margin-left .28s;
}
</style>