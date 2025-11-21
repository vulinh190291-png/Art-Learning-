import Vue from 'vue'
import Router from 'vue-router'

// 1. 引入刚才新建的文件
// 注意路径：从 router 文件夹出来(../)，进入 components 文件夹
import AdminLogin from '../components/AdminLogin.vue'

// 2. 同时也引入原来的，做个对比调试
import OldLogin from '../views/Login/Login.vue'

Vue.use(Router)

// 🕵️‍♂️ 自检代码：在控制台打印引入结果
console.log('=============== 路由文件诊断 ===============')
console.log('1. 新文件 AdminLogin:', AdminLogin)
console.log('2. 旧文件 OldLogin:', OldLogin)
console.log('==========================================')

// 🛠️ 兜底组件：如果引入失败，就用这个显示报错
const FallbackComponent = {
  render(h) {
    return h('div', { style: { background: 'red', color: 'white', padding: '20px' } }, [
      h('h1', '❌ 文件引入失败！'),
      h('p', '请按 F12 打开控制台，看刚才打印的日志。'),
      h('p', '如果 AdminLogin 是 undefined，说明路径写错了。')
    ])
  }
}

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    // 1. 拦截 UniApp 默认路径
    {
      path: '/pages/index/index',
      // 如果 AdminLogin 存在就用它，否则用兜底报错组件
      component: AdminLogin || FallbackComponent
    },
    
    // 2. 根路径
    {
      path: '/',
      name: 'Root',
      component: AdminLogin || FallbackComponent
    },

    // 3. 登录页
    {
      path: '/login',
      name: 'Login',
      component: AdminLogin || FallbackComponent
    },

    // 4. 旧的登录页路径（用于对比）
    {
      path: '/old-login',
      component: OldLogin || FallbackComponent
    }
  ]
})