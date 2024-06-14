import request from '@/utils/request'
import type { LoginDataType, ResponseMenuListType, ResponseUserInfoType } from './types/loginType'

/**
 * 登录接口
 * @param data
 * @returns
 */
export const login = (data: LoginDataType) => {
  return request<string>({ url: '/user/login', method: 'POST', data })
}

/**
 * 获取用户信息接口
 * @returns
 */
export const getUserInfo = () => {
  return request<ResponseUserInfoType>({ url: '/user/info', method: 'GET' })
}

/**
 * 获取菜单数据
 * @returns
 */
export const getMenuList = () => {
  return request<ResponseMenuListType[]>({ url: '/user/menus', method: 'GET' })
}
