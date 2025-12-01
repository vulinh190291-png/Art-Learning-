<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </section>
</template>

<style scoped>
.app-main {
  padding: 20px;
  min-height: calc(100vh - 50px);
}
</style>