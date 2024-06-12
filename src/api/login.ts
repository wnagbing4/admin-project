import request from "@/utils/request"
export const login = (data:any) => {
    return request<string>({ url: '/user/login', method: 'POST', data })
  }