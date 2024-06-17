// 将动态路由添加到路由表中

import type { RouteRecordRaw, Router } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

interface EagerLoadedFunc {
  default: RouteRecordRaw
}
type EagerLoadedModules = Record<string, EagerLoadedFunc>

// 1. 获取modules目录下所有的动态路由文件
const routeFiles: EagerLoadedModules = import.meta.glob('./modules/*.ts', { eager: true })

// 2. 初始化一个变量,保存遍历出来的路由
const routeConfiguras: RouteRecordRaw[] = []
// 3. 遍历所有文件的路由
Object.keys(routeFiles).forEach((routeModule: string) => {
  routeFiles[routeModule].default && routeConfiguras.push(routeFiles[routeModule].default)
})

// 4. 动态添加路由
export const useMiddleware = (router: Router) => {
  let registerRouteFresh = true
  router.beforeEach(async (to, from, next) => {
    const store = useAuthStore()
    const token = store.token

    if (!token) {
      if (to.path === '/login') {
        next()
      } else {
        next('/login')
      }
    } else {
      if (to.path === '/login') {
        console.log('1')
        next(from.fullPath)
      } else {
        console.log('2')
        if (store.info && store.menuList) {
          console.log('8')
          next()
        } else {
          const res = await store.userInfo()
          const menuList = await store.getMenu()

          if (res && menuList) {
            const routes = filterAsyncRoute(menuList, routeConfiguras)
            console.log(',routes', routes)
            console.log('3')

            if (registerRouteFresh) {
              routeConfiguras.forEach((route: any) => {
                router.addRoute(route)
              })
              registerRouteFresh = false
              next(to.path)
            } else {
              console.log('5')
              next()
            }
          } else {
            console.log('4')
            next('/login')
          }
        }
      }

      // if (to.path === '/login') {
      //   next(from.fullPath)
      // } else {
      //   console.log('1')
      //   const res = await store.userInfo()
      //   const menuList = await store.getMenu()
      //   if (res && menuList) {
      //     const routes = filterAsyncRoute(menuList, routeConfiguras)
      //     console.log(',routes', routes)
      //     if (registerRouteFresh) {
      //       routeConfiguras.forEach((route: any) => {
      //         router.addRoute(route)
      //       })
      //       registerRouteFresh = false
      //       next({ path: to.path, replace: true })
      //     } else {
      //       next()
      //     }
      //   } else {
      //     next('/login')
      //   }
      // }
    }
  })
}

// 函数自身调用自身, 必须需要有结束的条件,
// 子级做的事 和 父级的事是一样的

const filterAsyncRoute = (data: any[], routeConfiguras: any[]): any[] => {
  const filteredRoutes: any[] = []

  const deepRoute = (data: any[], routeConfiguras: any[]): void => {
    data.forEach((menu: any) => {
      // 相同的一级路由的数据
      const route = routeConfiguras.find((route: any) => route.name === menu.component)

      if (route) {
        if (menu.children && menu.children.length > 0) {
          route.children = filterAsyncRoute(menu.children, route.children)
        }
        filteredRoutes.push(route)
      }
    })
  }

  deepRoute(data, routeConfiguras)

  return filteredRoutes
}

// const filterAsyncRoute = (data: any, routeConfiguras: any) => {
//   const permissionRoute: any[] = []

//   const deepRoute = (data: any, routeConfiguras: any) => {
//     routeConfiguras.forEach((route: any) => {
//       data.forEach((menu: any) => {
//         if (route.name === menu.component) {
//           let childs: any = []
//           menu.children.forEach((citem: any) => {
//             route.children.forEach((child: any) => {
//               if (child.name === citem.component) {
//                 childs.push(child)
//               }
//             })
//           })

//           route.children = childs
//           permissionRoute.push(route)
//         }
//       })
//     })
//   }
//   deepRoute(data, routeConfiguras)

//   return permissionRoute
// }

// const filterAsyncRoute = (data: any, routeConfiguras: any) => {
//   const permissionRoute: any[] = []

//   routeConfiguras.forEach((route: any) => {
//     data.forEach((menu: any) => {
//       if (route.name === menu.component) {
//         if (menu.children && menu.children.length > 0) {
//           // 递归调用deepRoute函数，将子数据添加到route的children数组中
//           route.children = filterAsyncRoute(menu.children, route.children)
//         }
//         permissionRoute.push(route)
//       }
//     })
//   })

//   return permissionRoute
// }
