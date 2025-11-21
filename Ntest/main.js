// #ifndef VUE3
import Vue from 'vue'
import App from './App.vue'
import './uni.promisify.adaptor'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 1. 引入路由
import router from './router' 

// 2. 引入我们的“宿主容器”页面
import AppEntry from './pages/index/index.vue'

// 注册 Element UI
Vue.use(ElementUI)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  // 3. 挂载路由
  router, 
  ...App,
  
  // ⚠️⚠️⚠️ 核心修复代码 ⚠️⚠️⚠️
  // 强制使用 AppEntry (pages/index/index) 作为根组件渲染
  // 这样无论地址栏是 #/login 还是 #/home，UniApp 都会乖乖加载这个壳子
  // 而不会因为 pages.json 里找不到路径就白屏
  render: h => h(AppEntry)
})
app.$mount()
// #endif

// #ifdef VUE3
// Vue3 部分不用动，反正你现在用的是 Vue2
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif