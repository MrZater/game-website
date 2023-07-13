import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './init.scss'
import lazys from '@/directives/lazys'
import store from './store'
import 'virtual:svg-icons-register'
import SvgIconPlug from '@/assets/icons/index'
createApp(App).use(store).use(router).use(lazys).use(SvgIconPlug).mount('#app')
