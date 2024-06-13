import request from '@/utils/request'

export const test = () =>
  request(
    {
      url: '/public/test',
      method: 'GET',
      params: {
        name: "<p onclick='alert(123)'>heklo</p>"
      }
    },
    {
      isPurify: true
    }
  )

export const test_err = () => request({ url: '/public/test', method: 'POST' })
