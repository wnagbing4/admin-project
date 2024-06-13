// 存储
export const setStorage = (key: string, value: any) => {
  if (typeof value !== 'object') {
    localStorage.setItem(key, value)
  }

  if (
    Object.prototype.toString.call(value) !== '[object object]' ||
    Object.prototype.toString.call(value) !== '[object Array]'
  ) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

// 获取
export const getStorage = (key: string) => {
  return localStorage.getItem(key)
}

// 删除
export const removeStorage = (key: string) => {
  localStorage.removeItem(key)
}

// 清空
export const clearStorage = () => {
  localStorage.clear()
}
