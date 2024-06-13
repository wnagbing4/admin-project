import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { LoginDataType, ResponseUserInfoType } from '@/api/types/loginType'
import { login, getUserInfo } from '@/api/login'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref<string>()
    const info = ref<ResponseUserInfoType | null>(null)

    // 设置token
    const setToken = (value: string) => {
      token.value = value
    }

    // 登录
    const userLogin = async (loginForm: LoginDataType) => {
      try {
        const res = await login(loginForm)
        console.log('res=>', res)
        setToken(res.data)
        return res
      } catch (error) {
        console.error(error)
      }
    }

    // 获取用户信息
    const userInfo = async () => {
      try {
        const res = await getUserInfo()
        console.log('Res=>', res)
        info.value = res.data
        return res
      } catch (error) {
        console.error(error)
      }
    }

    // 重置token与用户信息
    const resetUser = () => {
      console.log('aaa')
      token.value = ''
      info.value = null
    }

    return {
      token,
      userLogin,
      info,
      userInfo,
      resetUser
    }
  },
  {
    persist: {
      storage: localStorage,
      paths: ['token']
    }
  }
)
