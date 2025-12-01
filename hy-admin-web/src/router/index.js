import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/views/user/user.vue'),
        meta: { title: '会员管理' }
      }
    ]
  },
  {
    path: '/mall',
    component: Layout,
    children: [
      {
        path: 'goods',
        component: () => import('@/views/mall/goods.vue'),
        meta: { title: '商品列表' }
      },
      {
        path: 'order',
        component: () => import('@/views/mall/order.vue'),
        meta: { title: '订单管理' }
      }
    ]
  },
  {
    path: '/content',
    component: Layout,
    children: [
      {
        path: 'post',
        component: () => import('@/views/content/post.vue'),
        meta: { title: '帖子审核' }
      }
    ]
  },
  {
    path: '/edu',
    component: Layout,
    children: [
      {
        path: 'course',
        component: () => import('@/views/edu/course.vue'),
        meta: { title: '课程管理' }
      },
      {
        path: 'instructor',
        component: () => import('@/views/edu/instructor.vue'),
        meta: { title: '讲师管理' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('hy-token')
  if (!token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

export default router