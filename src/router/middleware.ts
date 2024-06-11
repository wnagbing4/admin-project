
// 将动态路由添加到路由表中

import type { RouteRecordRaw } from 'vue-router'

// 1. 获取modules目录下所有的动态路由文件
const routeFiles = import.meta.glob('./modules/*.ts', { eager: true })
console.log('routeFiles', routeFiles)
// 2. 初始化一个变量,保存遍历出来的路由
const routeConfiguras: RouteRecordRaw[] = []

// 3. 遍历所有文件的路由
Object.keys(routeFiles).forEach((routeModule: string) => {
    // @ts-ignore
    routeFiles[routeModule].default && routeConfiguras.push(routeFiles[routeModule].default)
})
