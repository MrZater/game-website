// 导入vue-router中的createRouter和createWebHashHistory
import { createRouter, createWebHashHistory } from 'vue-router'
// 导入vuex的store
import store from '@/store'
// 导入处理uuid的工具函数
import { generateUUID } from '@/utils/generateUUID'
// 导入路由配置
import { routes } from './routes.js'

// 创建路由实例
const router = createRouter({
  // 使用hash模式的路由历史
  history: createWebHashHistory(),
  // 使用导入的路由配置
  routes,
})
// 设置路由守卫
router.beforeEach(async(to, from, next) => {
  // 从本地存储中获取uuid
  let uid = localStorage.getItem('uid')
  // 如果本地存储中没有uuid，则生成一个新的uuid
  if (!uid) {
    uid = generateUUID()
    localStorage.setItem('uid', uid)
  }
  // 将uid存储到vuex的store中
  store.commit('user/SET_UID', uid)
  // 继续路由导航
  next()
})

// 导出路由实例
export default router
