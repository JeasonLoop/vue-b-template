import { get, post, put, del } from '@/service'

// 用户相关接口
export const userApi = {
  // 获取用户列表
  getUsers: (params) => get('/users', params),

  // 创建用户
  createUser: (userData) => post('/users', userData),

  // 获取用户详情
  getUserById: (id) => get(`/users/${id}`),

  // 更新用户
  updateUser: (id, userData) => put(`/users/${id}`, userData),

  // 删除用户
  deleteUser: (id) => del(`/users/${id}`)
}