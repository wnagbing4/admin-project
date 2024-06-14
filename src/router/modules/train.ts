// 权限管理的路由

export default {
  path: '/train',
  name: 'Train',
  meta: { name: '训练管理' },
  component: () => import('@/layouts/index.vue'),
  children: [
    {
      path: 'classroom',
      name: 'Classroom',
      meta: { name: '课堂训练' },
      component: () => import('@/views/trainManager/classroom.vue')
    },
    {
      path: 'afterclass',
      name: 'Afterclass',
      meta: { name: '课后训练' },
      component: () => import('@/views/trainManager/afterclass.vue')
    },
    {
      path: 'character',
      name: 'Character',
      meta: { name: '品格教育' },
      component: () => import('@/views/trainManager/character.vue')
    }
  ]
}
