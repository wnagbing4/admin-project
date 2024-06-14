import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { useMiddleware } from './middleware'

// 静态路由 任何用户都可以访问的页面
// 动态路由 拥有对应权限才能访问的页面

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: { name: '首页' },
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: { name: '面板' },
        component: () => import('@/views/home.vue')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue')
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('@/views/404.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
  scrollBehavior() {
    return { top: 0 }
  }
})

useMiddleware(router)

export default router
