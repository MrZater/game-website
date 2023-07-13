import Home from '@/views/Home/index.vue' // 导入Home组件
import Detail from '@/views/Detail/index.vue' // 导入Detail组件
import GameIframe from '@/views/GameIframe/index.vue' // 导入GameIframe组件
import Contact from '@/views/Contact/index.vue' // 导入Contact组件
import Privacy from '@/views/Privacy/index.vue' // 导入Privacy组件
import Result from '@/views/Result/index.vue' // 导入Result组件

export const routes = [
  {
    path: '/',
    redirect: 'home', // 重定向到home路径
  },
  {
    path: '/home',
    name: 'Home', // 路由名称为Home
    component: Home, // 组件为Home
  },
  {
    path: '/detail',
    name: 'Detail', // 路由名称为Detail
    component: Detail, // 组件为Detail
  },
  {
    path: '/exhibition',
    name: 'Exhibition', // 路由名称为Exhibition
    component: Detail, // 组件为Detail
  },
  {
    path: '/game',
    name: 'Game', // 路由名称为Game
    component: GameIframe, // 组件为GameIframe
  },
  {
    path: '/contact',
    name: 'Contact', // 路由名称为Contact
    component: Contact, // 组件为Contact
  },
  {
    path: '/privacy',
    name: 'Privacy', // 路由名称为Privacy
    component: Privacy, // 组件为Privacy
  },
  {
    path: '/result',
    name: 'Result', // 路由名称为Result
    component: Result, // 组件为Result
  },
]
