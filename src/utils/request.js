// 创建一个axios实例
import axios from 'axios'
// 引入store
// import store from '@/store'

// 创建一个axios实例
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 设置请求的基础URL
  timeout: 10000, // 设置请求超时时间
  headers: { 'Content-Type': 'application/json' }, // 设置请求头
})

// 请求拦截器
api.interceptors.request.use(
  config => config, // 返回请求配置
  error => Promise.reject(error), // 返回错误信息
)

// 响应拦截器
api.interceptors.response.use(
  response => {
    const { data = {}} = response // 返回响应结果
    return data
  },
  error => Promise.reject(error.message), // 返回错误信息
)
export default api
