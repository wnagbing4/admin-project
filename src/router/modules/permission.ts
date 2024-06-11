// 权限管理的路由 
export default {
    path: '/permission',
    name: 'Permission',
    meta: { name: '权限管理' },
    // @ts-ignore
    component: () => import('@/layouts/index.vue'),
    children: [
        {
            path: 'user',
            name: 'User',
            meta: { name: '用户管理' },
            // @ts-ignore
            component: () => import('@/views/userManager/index.vue')
        },
        {
            path: 'role',
            name: 'Role',
            meta: { name: '角色管理' },
            // @ts-ignore
            component: () => import('@/views/roleManager/index.vue')
        },
        {
            path: 'menu',
            name: 'Menu',
            meta: { name: '菜单管理' },
            // @ts-ignore
            component: () => import('@/views/menuManager/index.vue')
        }
    ]
}