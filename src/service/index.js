// src/utils/request.js
import axios from 'axios'

const baseURL = ' https://mock.presstime.cn/mock/6793361bb365a6d869405ca8/vueb/api'

// 创建 axios 实例
const service = axios.create({
  baseURL: baseURL || '/api', // 从环境变量获取基础地址
  timeout: 10000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在这里可以统一处理请求配置，例如添加 token
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 处理响应数据格式
    if (response.data.response.code === 200) {
      return response.data.response
    } else {
      // 处理业务逻辑错误
      return Promise.reject(new Error(response.data.response.message || '请求失败'))
    }
  },
  error => {
    // 处理 HTTP 错误状态码
    let message = '请求失败'
    if (error.response) {
      switch (error.response.code) {
        case 400:
          message = '请求参数错误'
          break
        case 401:
          message = '登录已过期'
          // 这里可以跳转到登录页
          break
        case 404:
          message = '资源未找到'
          break
        case 500:
          message = '服务器错误'
          break
      }
    }
    return Promise.reject(new Error(message))
  }
)

/**
 * 通用请求方法
 * @param {string} method - 请求方法 GET/POST/PUT/DELETE
 * @param {string} url - 请求地址
 * @param {object} [data] - 请求参数（body 参数）
 * @param {object} [params] - 请求参数（query 参数）
 */
export function request(method, url, data = {}, params = {}) {
  return service({
    method: method.toLowerCase(),
    url,
    data,
    params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 导出常用方法别名
export const get = (url, params) => request('get', url, null, params)
export const post = (url, data) => request('post', url, data)
export const put = (url, data) => request('put', url, data)
export const del = (url, data) => request('delete', url, data)