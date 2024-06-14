// 登录接口参数类型
export type LoginDataType = {
  password: string
  username: string
}

// 返回的用户信息数据的类型
export interface ResponseUserInfoType {
  age: number
  createdAt: string
  deviceid: string
  gender: number
  grade: string
  id: number
  num: number
  phone: string
  province: string
  role: Role
  school: string
  status: number
  type: number
  updatedAt: string
  username: string
  [property: string]: any
}

export interface Role {
  createdAt: string
  id: number
  remark: string
  rolename: string
  updatedAt: string
  [property: string]: any
}

// 返回的菜单数据类型
export interface ResponseMenuListType {
  children?: Child[]
  component: string
  icon: string
  id: number
  isParent: boolean
  link: string
  menuname: string
  parentid: number
}

export interface Child {
  component: string
  icon: string
  id: number
  isParent: boolean
  link: string
  menuname: string
  parentid: number
  children?: Child[]
}
