import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard/home'
  },
  {
    path: '/login',
    name: 'Login',
    // redirect: '/dashBoard/home'
    // @ts-ignore
    component: () => import('@/views/login.vue')
  },
  {
    path: '/dashBoard',
    name: 'DashBoard',
    meta: { name: '首页' },
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: { name: '面板' },
        // @ts-ignore
        component: () => import('@/views/home.vue')
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    // @ts-ignore
    component: () => import('@/views/404.vue')
  }
]
// @ts-ignore
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
