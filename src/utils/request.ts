import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'
import { ElMessage } from 'element-plus'

import { useAuthStore } from '@/stores/auth'
import router from '@/router/index'

import DOMPurify from 'dompurify'
type RequestCustomConfig = {
  isPurify: boolean
}

// 创建axios实例
const service: AxiosInstance = axios.create({
  //   baseURL: 'http://serverqn.9yuecloud.com',
  //   baseURL: '/api',
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
// 创建一个新数组, 数组保存的是未完成请求的接口地址
// 请求成功时, 从数组里面移除已完成的请求的接口地址
// 如果这个请求没有完成, 不能在继续发送相同的请求 --->
// 如果下一次请求的接口地址在新数组里面, 说明当前的请求没有完成,这个时候, 不能再次发送请求
// 安装一个插件, &lt;script&gt;</script>
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const store = useAuthStore()
    if (store.token) {
      config.headers.Authorization = `Bearer ${store.token}`
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// status http请求的状态码 404 401 500 200
// code 业务码 后端给我们返回的

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('response=>', response)
    if (response.data.code === 200) {
      return response.data
    }
  },
  async (error: AxiosError<ResponseDataType>) => {
    const store = useAuthStore()
    // var router=useRouter()
    let message = ''

    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          
          message = '登录过期，请重新登录'
         
          // TODO : 清除token,以及用户信息
          await store.resetUser()

          // TODO : 回到登录页
          //  window.location.reload()
          console.log(router,'router');
          
              router.push('/login')

          break
        case 403:
          message = '没有权限'
          break
        case 404:
          message = '请求地址不存在'
          break
        case 400:
          message = (error.response.data && error.response.data.msg) || '参数错误'
          break
        case 500:
          message = (error.response.data && error.response.data.msg) || '网络错误'
      }
    }
    console.log('123')
    ElMessage({
      message,
      type: 'error',
      duration: 1000
    })

    return Promise.reject(error)
  }
)

type ResponseDataType<T = any> = {
  code: number
  msg: string
  data: T
}

// 防止未完成的请求进行重复请求 true ,
const historyRequest: string[] = []

// 完整请求的方法
const request = <T = any>(options: AxiosRequestConfig, customConfig?: RequestCustomConfig) => {
  // 防止重复的请求
  const url = options && options.url
  if (historyRequest.includes(url!)) {
    return Promise.reject(new Error('重复请求'))
  }
  url && historyRequest.push(url!)

  // 防止xss攻击, 静态脏数据
  if (customConfig?.isPurify) {
    if (options.method?.toLocaleUpperCase() === 'POST' && options.data) {
      const dataStr = JSON.stringify(options.data)
      options.data = JSON.parse(DOMPurify.sanitize(dataStr))
    }
    if (options.method?.toLocaleUpperCase() === 'GET' && options.params) {
      for (const key in options.params) {
        options.params[key] = DOMPurify.sanitize(options.params[key])
        console.log('options.params', options.params)
      }
    }
  }

  return service
    .request<T, ResponseDataType<T>>({
      ...options,
      [options.method === 'GET' ? 'params' : 'data']: options.data
    })
    .finally(() => {
      const url = options && options.url
      const idx = historyRequest.indexOf(url!)
      historyRequest.splice(idx, 1)
    })
}

// GET
export const get = <T = any>(url: string, data: Object) => {
  return request<T>({ url, method: 'GET', data })
}

// POST
export const post = <T = any>(url: string, data: Object) => {
  return request<T>({ url, method: 'POST', data })
}

// PUT
export const put = <T = any>(url: string, data: Object) => {
  return request<T>({ url, method: 'PUT', data })
}

// DELETE
export const del = <T = any>(url: string, data: Object) => {
  return request<T>({ url, method: 'DELETE', data })
}

// 导出axios实例对象
export default request

// 公共样式
// 封装本地存储方法
// pinia的使用以及持久化
// 页面鉴权
// 获取用户信息
// token过期的处理
